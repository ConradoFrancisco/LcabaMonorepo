import Layout from "@/components/layout/Layout"
import SliderInformes from '@/components/sections/home/SliderInformes'
import Section2 from '@/components/sections/home/Section2'
import Section3 from '@/components/sections/home/Section3'
import Section4 from '@/components/sections/home/Section4'
import Section5 from '@/components/sections/home/Section5'
import Section6 from '@/components/sections/home/Section6'
import Section7 from '@/components/sections/home/Section7'
import Section8 from '@/components/sections/home/Section8'
import Section9 from '@/components/sections/home/Section9'
import { PageServices } from '@lcaba/services'

export default async function Home() {

	const menuItems = await PageServices.getNavMenu(7);
	const pageVw = await PageServices.getPageVw('7');
	const logo = pageVw?.images?.find((img: any) => img.image_type === 'logo');

	// Posts destacados de OIP (desa = 1 → se muestra en slider)
	const sliderPostsData = await PageServices.getPosts('evidencias_', true, 0, 4, true);
	const sliderPosts = sliderPostsData?.data ?? sliderPostsData ?? [];

	return (
		<>
			<Layout menuItems={menuItems} pageVw={pageVw} logo={logo}>
				<SliderInformes posts={sliderPosts} />
				<Section2 />
				<Section3 />
				<Section4 />
				<Section5 />
				<Section6 />
				<Section7 />
				<Section8 />
				<Section9 />
			</Layout>
		</>
	)
}
