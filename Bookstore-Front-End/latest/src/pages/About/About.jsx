import AboutContent from "../../components/about/about_content";
import AboutPrimary from "../../components/about/about_primary";
import Layout from "../../layout/Layout";

export default function About() {
  return (
    <>
      <Layout>
        <AboutPrimary />
        <AboutContent />
        
      </Layout>
    </>
  );
}
