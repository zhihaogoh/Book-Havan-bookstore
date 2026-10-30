import { Alert, Col, Row, Spinner } from "react-bootstrap";
import ProfilePage from "../../components/dashboard/profile_page";
import Listing from "../../components/dashboard/listing";
import RecentOrder from "../../components/dashboard/recent_order";
import { useEffect, useState } from "react";
import { getProfile } from "../../auth/auth";

export default function Profile() {
  const [user,setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() =>{
      const loadProfile = async () =>{
        try{
          const result = await getProfile();
          setUser(result.data ?? result);
        } catch (error){
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      loadProfile();
  }, []);

  if(loading) return <Spinner className="center" animation="border" />
  if(error) return <Alert variant="danger">{error}</Alert>
  return (
    <>
      <>
        <div className="container">
          <Row>
            <Col md={4} lg={3} className="d-none d-md-block">
              <Listing />
            </Col>
            <Col md={8} lg={9}>
              <ProfilePage 
                first_name = {user?.first_name}
                last_name = {user?.last_name}
                gender = {user?.gender}
                phone_number = {user?.phone_number}
                email = {user?.email}
              />
              <RecentOrder />
            </Col>
          </Row>
        </div>
      </>
    </>
  );
}
