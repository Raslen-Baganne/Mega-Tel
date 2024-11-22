import HomePage from '../../pages/App_PAges/HomePage/HomePage';


const gridContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: 'transparent', // Set the background color to black
}

const contentStyle = {
  flex: '1',
  
  
}


  

export default function Home() {
  return (
    <div style={gridContainerStyle} >
      
      
      
      <div style={contentStyle}>
        
        
        <HomePage />
      </div>
    </div>
  );
}
