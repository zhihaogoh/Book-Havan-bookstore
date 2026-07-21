import Banner from "../../components/Banner/Banner";
import Categories from "../../components/categories/Categories";
import ServiceList from "../../components/service/service_list";
import Layout from "../../layout/Layout";

export default function Home() {
  return (
    <>
        <Layout>
            <Banner />
            <ServiceList />
            <Categories />
        </Layout>
    </>
  );
}