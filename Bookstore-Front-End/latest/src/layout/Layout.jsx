import Footer from "./footer/footer";
import Header from "./header/header";
import PropTypes from "prop-types";

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};
