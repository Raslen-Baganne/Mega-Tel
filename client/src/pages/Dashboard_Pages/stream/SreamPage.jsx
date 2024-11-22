import { useEffect, useState } from 'react';
import { Call, CallControls, StreamCall, StreamTheme, StreamVideo, SpeakerLayout, StreamVideoClient, CallingState, useCallStateHooks} from '@stream-io/video-react-sdk';
import useUserData from '../../../Hooks/useUserData';
import { Spin, Alert } from 'antd';
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./styles.css";
import { Link, useLocation } from 'react-router-dom';
import CallEndedPage from '../../Dashboard_Pages/CallEndedPage/CallEndedPage';

// Move the token provider to a separate function outside the component
const tokenProvider = async (userId) => {
  if (!userId) {
    console.log('User data is still loading...');
    return;
  }

  try {
    const response = await fetch('http://localhost:8000/stream-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const token = data.token;

    console.log('token receved :)');
    return token;
  } catch (error) {
    console.error('Error getting token:', error);
  }
};

const useVideoClient = (userId, apiKey, Firstname, ImgURL, callId,callType) => {
  const [videoClient, setVideoClient] = useState();
  const [call, setCall] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    
    if (!userId || !apiKey) {
      console.log('Prerequisites for initializing the video client are not met.');
      return;
    }

    const initVideoClient = async () => {
      console.log('Initializing video client for user:', userId);
      const token = await tokenProvider(userId);

      if (token) {
        const client = new StreamVideoClient({
          apiKey: apiKey, // your Stream API key
          user: {
            id: userId, // the user ID you fetched from the database
            name: Firstname, // the user's name
            image: ImgURL, // the user's image URL
          },
          token: token, // the token you got
        });
        

        setVideoClient(client);

        const videoCall = client.call(callType,callId);
        setCall(videoCall);
        await videoCall.camera.disable();
        await videoCall.microphone.disable();
        await videoCall.join({ create: true });
        
        
      } else {
        console.error('Failed to retrieve token for user:', userId);
      }
    };

    initVideoClient().catch(setError).finally(() => setLoading(false));
  }, [userId, apiKey]);

  return { videoClient, call, loading, error };
};



const StreamPage = () => {
  
  const { userInfo, loading: userLoading } = useUserData();
  const userId = userInfo?._id;
  const Firstname = userInfo?.Firstname;
  const ImgURL = userInfo?.profilePhoto?.url;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const callId = queryParams.get('call_id');
  const callType = (queryParams.get('call_type') || 'default').toString();
  const apiKey = import.meta.env.VITE_APP_STREAM_API_KEY;
  


  const { videoClient, call, loading: clientLoading, error } = useVideoClient(userId, apiKey, Firstname, ImgURL, callId,callType);
  
  
  return (
    <StreamVideo client={videoClient} >

        <StreamCall call={call} >
      
        <MyUILayout 
          error={error}
          userLoading={userLoading}
          clientLoading={clientLoading}
        />
        
        </StreamCall>

        </StreamVideo>
    
  );
};

const MyUILayout = ({ error, userLoading, clientLoading }) => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  console.log(callingState)
  
  if (userLoading || clientLoading) {
    return (
      <Spin tip="Loading...">
        <div style={{ padding: 50, borderRadius: 4 }} />
      </Spin>
    );
  }

  // Handle error state
  if (error) {
    return <Alert message="An error occurred" description={error.message} type="error" showIcon />;
  }

  // Handle different calling states
  switch (callingState) {
    case CallingState.JOINED:
      return (
        <StreamTheme className="my-theme-overrides">
          <SpeakerLayout participantsBarPosition='bottom' />
          <CallControls />
        </StreamTheme>
      );
    case CallingState.LEFT:
      return <CallEndedPage/>
    default:
      return <Alert message="An error occurred" description={callingState} type="error" showIcon />;
  }
};



export default StreamPage;
