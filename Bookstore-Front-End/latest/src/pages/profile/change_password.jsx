import { Col, Row } from "react-bootstrap";
import Listing from "../../components/dashboard/listing";
import Layout from "../../layout/Layout";
import ChangePasswordForm from "../../components/change_password/change_password_form";

export default function ChangePassword(){
    return(
        <>
        <Layout>
            <div className="container">
                <Row>
                    <Col md={4} lg={3} className="d-none d-md-block">
                        <Listing />
                    </Col>
                    <Col md={8} lg={9}>
                        <ChangePasswordForm />
                    </Col>
                </Row>
                
            </div>
        </Layout>
        </>
    )
}
