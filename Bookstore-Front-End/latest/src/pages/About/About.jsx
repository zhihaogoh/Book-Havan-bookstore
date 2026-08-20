import AboutContent from "../../components/about/about_content";
import AboutPrimary from "../../components/about/about_primary";
import Pillar from "../../components/about/Pillar";
import Scholars from "../../components/about/scholars";
import Layout from "../../layout/Layout";

export default function About() {
  return (
    <>
      <Layout>
        <AboutPrimary />
        <AboutContent />
        <Pillar />
        <Scholars />
      </Layout>
    </>
  );
}
