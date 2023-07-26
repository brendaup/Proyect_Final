import { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthProvider, useAuth } from '../../../context/AuthContext/AuthContext';
import { MovieContext } from '../../../context/MoviesContext/MoviesContext';

function Visitors() {



  const { userVisitorCounter, setUserVisitorCounter, userVisitorCounterUniq, setUserVisitorUniq } = useContext(MovieContext)



  const [dataVisitor, setDataVisitor] = useState([]);
  const [ipsData, setIpsData] = useState([]);
  const [ipsBase, setIpsBase] = useState(0);
  const [ipsUniqCounter, setIpsUniqCounter] = useState(0);

  let resourceId = '1';
  const apiIp = "https://ipapi.co/json";
  const apiCounter = "https://64c0c38c0d8e251fd11283ee.mockapi.io/counter";

  useEffect(() => {

    const fetchData = async () => {
      const response = await axios.get(`${apiCounter}/${resourceId}`);
      setIpsBase(response.data.counter);
      setIpsData(response.data.ips);
      setIpsUniqCounter(response.data.counterUniq);
      setUserVisitorCounter(response.data.counter);
      setUserVisitorUniq(response.data.counterUniq)
    };
    fetchData();

    const fetchIpData = async () => {
      const response = await axios.get(apiIp);
      setDataVisitor(response.data.ip);

    };
    fetchIpData();
  }, []);

  useEffect(() => {

    ipsearcher();
  }, [dataVisitor, ipsData]);

  const ipsearcher = async () => {
    if (ipsData && ipsData.find((item) => item == dataVisitor)) {

      const counterUniq = ipsUniqCounter;
      const counter = ipsBase + 1;
      const ipsArray = [...ipsData, dataVisitor];

      await axios.put(`${apiCounter}/${resourceId}`, {
        counterUniq: counterUniq,
        ips: ipsArray,
        counter: counter,
      });


    } else {
      const ipsArray = [...ipsData, dataVisitor];
      const counterUniq = ipsUniqCounter + 1;
      const counter = ipsBase + 1;

      await axios.put(`${apiCounter}/${resourceId}`, {
        counterUniq: counterUniq,
        ips: ipsArray,
        counter: counter,
      });


    }
  };

  return (
    <>
    </>
  );
};

export default Visitors;
