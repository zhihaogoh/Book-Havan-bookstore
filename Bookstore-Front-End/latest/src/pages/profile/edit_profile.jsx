import { Col, Row } from "react-bootstrap";
import Layout from "../../layout/Layout";
import Listing from "../../components/dashboard/listing";
import EditProfileForm from "../../components/edit_profile/edit_profile_form";

export default function EditProfile() {
  return (
    <>
      <Layout>
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
                  },
                  {
                    name: "last_name",
                    type: "text",
                    label: "Last Name",
                    placeholder: "Enter your last name",
                  },
                  {
                    name: "IC_Passport",
                    type: "number",
                    label: "IC or Passport",
                    placeholder: "Enter your IC or Passport",
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
                      },
                      {
                        id: 2,
                        gender: "Male",
                      },
                      {
                        id: 3,
                        gender: "Female",
                      },
                    ],
                  },
                  {
                    name: "date_of_birth",
                    type: "date",
                    label: "Date of birth",
                    placeholder: ""
                  },
                ]}
                fields_contact={[
                  {
                    name: "contact_number",
                    type: "text",
                    label: "Phone number",
                    placeholder: "Enter your phone number",
                  },
                  {
                    name: "email",
                    type: "text",
                    label: "Email",
                    placeholder: "Enter your email@example.com",
                  },
                ]}
              />
            </Col>
          </Row>
        </div>
      </Layout>
    </>
  );
}
