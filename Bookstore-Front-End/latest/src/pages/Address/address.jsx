import { Alert, Col, Row, Spinner } from "react-bootstrap";
import Listing from "../../components/dashboard/listing";
import AddressList from "../../components/dashboard/address_list";
import { useEffect, useState } from "react";
import { getAddress } from "../../auth/auth";

export default function Address(){
    const [address,setAddress] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect (() =>{
      const loadAddress = async () =>{
        try{
          const result = await getAddress();
          const addresses = result.addresses?.data ?? result.addresses;
          if (!Array.isArray(addresses)) {
            throw new Error("Unable to load addresses: invalid server response.");
          }
          setAddress(addresses);
        } catch (error){
          setError(error.message);
        } finally{
          setLoading(false);
        }
      };
      loadAddress();
    }, []);

      if(loading) return <Spinner className="center" animation="border" />
      if(error) return <Alert variant="danger">{error}</Alert>
    return(
        <>
        <>
            <div className="container">
          <Row>
            <Col md={4} lg={3} className="d-none d-md-block">
              <Listing />
            </Col>
            <Col md={8} lg={9}>
              <AddressList 
                addresses = {address}
              />
            </Col>
          </Row>
        </div>
        </>
        </>
    )
}
