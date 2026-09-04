import Layout from "@/components/layout/Layout"
import SliderInformes from '@/components/sections/home/SliderInformes'
import PageInfoSection from '@/components/sections/home/PageInfoSection'
import Section3 from '@/components/sections/home/Section3'
import Section4 from '@/components/sections/home/Section4'
import PostSection from '@/components/sections/home/PostSection'
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
	const sliderPostsData = await PageServices.getPosts('evidencias_', true, 0, 10, true);
	const sliderPosts = sliderPostsData?.data ?? sliderPostsData ?? [];


	// Posts para post Section del Home

	const postSectionData = await PageServices.getPosts('evidencias_', false, 0, 3, true, true);
	const postSection = postSectionData?.data ?? postSectionData ?? [];

	return (
		<>
			<Layout menuItems={menuItems} pageVw={pageVw} logo={logo}>
				<SliderInformes posts={sliderPosts} />
				<PageInfoSection pageVw={pageVw} logo={logo} />
				<PostSection posts={postSection} logo={logo} />
			</Layout>
		</>
	)
}
