import FluidGateway from './home/FluidGateway'
import CineSuntem from './home/CineSuntem'
import MisiuneaViziunea from './home/MisiuneaViziunea'
import ServiciiGrid from './home/ServiciiGrid'
import AplicatiaCESS from './home/AplicatiaCESS'
import DeCeNoi from './home/DeCeNoi'
import Testimoniale from './home/Testimoniale'
import Galerie from './home/Galerie'
import VideoSection from './home/VideoSection'
import FinalCTA from './home/FinalCTA'
import Newsletter from './home/Newsletter'

export default function Home() {
  return (
    <div>
      <FluidGateway />
      <CineSuntem />
      <MisiuneaViziunea />
      <ServiciiGrid />
      <AplicatiaCESS />
      <DeCeNoi />
      <Testimoniale />
      <Galerie />
      <VideoSection />
      <FinalCTA />
      <Newsletter />
    </div>
  )
}
