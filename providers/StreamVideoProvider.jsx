import { StreamVideo,StreamVideoClient } from "@stream-io/video-react-sdk";
import useUserData from '../Hooks/useUserData';
import { Spin, Alert } from 'antd';
import { useState,useEffect } from "react";


export const tokenProvider = async () => {
    const { userInfo ,loading} = useUserData();
    userId=userInfo?._id;
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

const StreamVideoProvider = ({ children }) => {
    const [videoClient, setVideoClient] = useState();
    const { userInfo:user, loading: isLoaded } = useUserData();
    useEffect(() => {
        if (!isLoaded || !user) return;
        if (!API_KEY) throw new Error('Stream API key is missing');
    
        
        

     
          const client = new StreamVideoClient({
            apiKey: apiKey, // your Stream API key
            user: {
                id: user?.id,
                name: user?.username || user?.id,
                image: user?.profilePhoto?.url,
            },
            tokenProvider, // the token you got
          });
          


    
        setVideoClient(client);
      }, [user, isLoaded]);
    
      if (!videoClient) return (
        <Spin tip="Loading...">
          <div style={{ padding: 50, borderRadius: 4 }} />
        </Spin>
      );
    
      return <StreamVideo client={videoClient}>{children}</StreamVideo>;


};
export default StreamVideoProvider;
