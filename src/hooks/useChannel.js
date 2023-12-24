import { useEffect, useState } from "react";
import { getChannelsApi } from "@/apis/article";

function useChannel(channelName) {
  const [channelList, setChannelList] = useState([]);
  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelsApi();
      setChannelList(res.data.channels);
    };
    getChannelList();
  }, []);

  return {
    channelList,
  };
}

export { useChannel };
