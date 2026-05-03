import Layout from '../../HOC/Layout/Layout'
import Hero from '../../components/Hero/Hero'
import Features from '../../components/Features/Features'
import Flow from '../../components/Flow/Flow'
import Preview from '../../components/Preview/Preview'
import CTA from '../../components/CTA/CTA'

const Hompage = () => {
  return (
      <Layout >
        <Hero />
        <Features />
        <Flow />
        <Preview />
        <CTA />
      </Layout>
  )
}

export default Hompage