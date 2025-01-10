import ComingSoonSection from "./ComingSoonSection";
import HomePageCarousel from "./HomePageCarousel";
import HomePageHeader from "./HomePageHeader";
import NowShowingPage from "./NowShowingPage";
import image1 from "./../../public/assets/images/1st.jpg";
import image2 from "./../../public/assets/images/2nd.webp";
import image3 from "./../../public/assets/images/3rd.webp";
import image4 from "./../../public/assets/images/4th.jpg";

const carouselData = [
  { src: image1, alt: "1st image" },
  { src: image2, alt: "2nd image" },
  { src: image3, alt: "3rd image" },
  { src: image4, alt: "4th image" },
];

export default function HomePage() {
  return (
    <div>
      <div>
        <HomePageHeader  />
        <HomePageCarousel data={carouselData}/>
        <NowShowingPage data={carouselData}/>
        <ComingSoonSection data={carouselData}/>
      </div>
    </div>
  );
}
