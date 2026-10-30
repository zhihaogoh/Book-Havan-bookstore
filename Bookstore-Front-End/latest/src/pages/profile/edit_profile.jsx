import { Alert, Col, Row, Spinner } from "react-bootstrap";
import Listing from "../../components/dashboard/listing";
import EditProfileForm from "../../components/edit_profile/edit_profile_form";
import { useEffect, useState } from "react";
import { getProfile } from "../../auth/auth";

export default function EditProfile() {
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
            <Col md={4} lg={3}>
              <Listing />
            </Col>
            <Col md={8} lg={9}>
              <EditProfileForm
                fields_basic={[
                  {
                    name: "first_name",
                    type: "text",
                    label: "First Name",
                    placeholder: "Enter your first name",
                    value :user?.first_name ?? ""
                  },
                  {
                    name: "last_name",
                    type: "text",
                    label: "Last Name",
                    placeholder: "Enter your last name",
                    value :user?.last_name ?? ""

                  },
                  {
                    name: "gender",
                    type: "select",
                    label: "Gender",
                    placeholder:"",
                    option: [
                      {
                        id: 1,
                        gender: "Please Select Gender",
                        value: "",
                      },
                      {
                        id: 2,
                        gender: "Male",
                        value: "male",
                      },
                      {
                        id: 3,
                        gender: "Female",
                        value: "female",
                      },
                    ],
                     value :user?.gender ?? "",
                  },
                  {
                    name: "date_of_birth",
                    type: "date",
                    label: "Date of birth",
                    placeholder: "",
                    value :user?.date_of_birth ?? "",
                  },
                ]}
                fields_contact={[
                  {
                    name: "contact_number",
                    type: "text",
                    label: "Phone number",
                    placeholder: "Enter your phone number",
                    value :user?.phone_number ?? "",
                  },
                  {
                    name: "email",
                    type: "text",
                    label: "Email",
                    placeholder: "Enter your email@example.com",
                    value :user?.email ?? "",
                  },
                ]}
              />
            </Col>
          </Row>
        </div>
      </>
    </>
  );
}
