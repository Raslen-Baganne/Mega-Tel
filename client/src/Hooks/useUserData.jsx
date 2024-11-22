import { useState, useEffect } from "react";

const useUserData = (paramId) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("token");
        // Use paramId if it's not null, otherwise use the ID from userInfo
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const idUser = paramId || userInfo._id;

        const response = await fetch(
            `http://localhost:8000/api/users/profile/${idUser}`,
            {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const data = await response.json();
        setUserInfo(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [paramId]); // Add paramId as a dependency

  return { userInfo, loading };
};

export default useUserData;
