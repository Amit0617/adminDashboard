import React, { useEffect } from "react";

function DataLoader({ setData }) {

    useEffect(() => {
        const getData = async () => {
        const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
        const data = await response.json();
        setData(data);
        };
        getData();
    }, []);
}
export default DataLoader;