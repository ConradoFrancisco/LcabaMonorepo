import Link from "next/link";

export default function Section2() {
    return (
        <>
            {/*seo-agency services-details section 2*/}
            <section className="seo-agency-services-details-section-2 position-relative overflow-hidden pb-120 pt-lg-0 pt-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 pe-lg-5">
                            <div className="border p-5 bg-primary">
                                <h6 className="mb-3 pb-3 border-bottom text-white text-anime-style-2">News category</h6>
                                <Link href="#" className="d-flex justify-content-between align-items-center mb-3" data-aos="fade-up" data-aos-delay={0}>
                                    <span className="fw-medium text-white">Investments</span>
                                    <i className="fa-solid fa-arrow-right-long text-white" />
                                </Link>
                                <Link href="#" className="d-flex justify-content-between align-items-center mb-3" data-aos="fade-up" data-aos-delay={200}>
                                    <span className="fw-medium text-white">Online Business</span>
                                    <i className="fa-solid fa-arrow-right-long text-white" />
                                </Link>
                                <Link href="#" className="d-flex justify-content-between align-items-center mb-3" data-aos="fade-up" data-aos-delay={400}>
                                    <span className="fw-medium text-white">Tax &amp; Declaration</span>
                                    <i className="fa-solid fa-arrow-right-long text-white" />
                                </Link>
                                <Link href="#" className="d-flex justify-content-between align-items-center mb-3" data-aos="fade-up" data-aos-delay={600}>
                                    <span className="fw-medium text-white">Customer Strategy</span>
                                    <i className="fa-solid fa-arrow-right-long text-white" />
                                </Link>
                                <Link href="#" className="d-flex justify-content-between align-items-center mb-3" data-aos="fade-up" data-aos-delay={800}>
                                    <span className="fw-medium text-white">Private Equality</span>
                                    <i className="fa-solid fa-arrow-right-long text-white" />
                                </Link>
                                <Link href="#" className="d-flex justify-content-between align-items-center mb-3" data-aos="fade-up" data-aos-delay={1000}>
                                    <span className="fw-medium text-white">Corporate Solution</span>
                                    <i className="fa-solid fa-arrow-right-long text-white" />
                                </Link>
                            </div>
                            <div className="border p-5 bg-light-2 mt-6 overflow-hidden">
                                <h6 className="mb-3 pb-3 border-bottom text-anime-style-2">Service process</h6>
                                <div className="d-flex gap-3 border-bottom py-3" data-aos="fade-up" data-aos-delay={0}>
                                    <div>
                                        <svg className="fill-primary" xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48" fill="none">
                                            <g clipPath="url(#clip0_1531_3871)">
                                                <path
                                                    d="M6.75146 29.6855H21.353C21.7672 29.6855 22.103 30.0214 22.103 30.4356V38.0528C22.103 38.467 21.7672 38.8028 21.353 38.8028H18.8306L16.4141 41.2193L16.4142 41.2194C16.1213 41.5123 15.6464 41.5123 15.3535 41.2194L15.3493 41.2151L12.937 38.8028H6.75148C6.33728 38.8028 6.00146 38.467 6.00146 38.0528V30.4356C6.00146 30.0214 6.33728 29.6856 6.75148 29.6856L6.75146 29.6855ZM9.93193 34.9331C9.62128 34.9331 9.36943 35.185 9.36943 35.4956C9.36943 35.8063 9.62128 36.0581 9.93193 36.0581H18.1725C18.4832 36.0581 18.735 35.8063 18.735 35.4956C18.735 35.185 18.4832 34.9331 18.1725 34.9331H9.93193ZM9.93193 32.4302C9.62128 32.4302 9.36943 32.6821 9.36943 32.9927C9.36943 33.3034 9.62128 33.5552 9.93193 33.5552H18.1725C18.4832 33.5552 18.735 33.3034 18.735 32.9927C18.735 32.6821 18.4832 32.4302 18.1725 32.4302H9.93193Z"
                                                    fill="#0D6EFD"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M29.5222 16.1323C29.5182 15.9918 29.5143 15.8506 29.5143 15.7101C29.5143 15.1926 29.5811 14.6635 29.7687 14.1786C29.9099 13.8138 30.1225 13.4811 30.3718 13.1809C30.6626 12.8307 31.0579 12.4855 31.3989 12.1838C31.6622 11.9508 32.0731 11.5787 32.2498 11.272C32.3616 11.0778 32.4133 10.8679 32.4133 10.6439C32.4133 10.1877 32.2269 9.81953 31.9018 9.50363C31.547 9.15879 31.1224 9.0028 30.629 9.0028C30.1669 9.0028 29.7605 9.1346 29.421 9.45153C29.0207 9.82518 28.8469 10.4311 28.7646 10.9548L28.7084 11.3119L26.5645 11.0548L26.6102 10.6816C26.7332 9.67717 27.0949 8.7324 27.8671 8.04991C28.6331 7.37289 29.5999 7.125 30.6056 7.125C31.6651 7.125 32.6805 7.38934 33.4763 8.11663C34.1903 8.76929 34.575 9.58259 34.575 10.5527C34.575 11.0951 34.4477 11.6106 34.1838 12.0844C33.8579 12.6697 33.2612 13.2445 32.7635 13.6856C32.5801 13.8481 32.3976 14.0142 32.2244 14.1875C32.1276 14.2843 32.0206 14.3933 31.9397 14.504C31.824 14.6623 31.7455 14.8412 31.694 15.0299C31.6079 15.3456 31.5988 15.8024 31.5926 16.1287L31.5856 16.4966H29.5326L29.5222 16.1323L29.5222 16.1323ZM29.4387 19.2524V16.937H31.7515V19.2524H29.4387Z"
                                                    fill="#0D6EFD"
                                                />
                                                <path
                                                    d="M15.8564 26.599L9.59379 25.1103L9.76664 24.3808L9.59318 25.1105C9.24447 25.0276 9.01109 24.7136 9.01662 24.3694V19.7704C7.58443 18.4031 6.67093 16.7415 6.25936 15.0567C5.88892 13.5402 5.92408 12.002 6.35215 10.6364C6.78931 9.24184 7.63406 8.02494 8.87403 7.18426C9.96769 6.44276 11.355 6.00195 13.0226 6.00195C13.6114 6.00195 14.172 6.04782 14.7032 6.13632C16.4694 6.43064 17.8347 7.20098 18.7671 8.33218C19.698 9.46164 20.1787 10.9288 20.1787 12.6206C20.1787 13.0587 20.1454 13.5165 20.0782 13.9921L21.7606 16.7717L21.7613 16.7713C21.9758 17.1256 21.8623 17.5868 21.508 17.8013C21.3844 17.8761 21.2477 17.911 21.1131 17.9097H20.394C20.4078 18.1563 20.4224 18.3956 20.4361 18.6209C20.4844 19.4117 20.5223 20.0324 20.4888 20.542C20.3671 22.3928 19.6537 22.8034 16.935 22.6863L16.8028 25.9051L16.0557 25.8758L16.8051 25.9066C16.7881 26.3204 16.4388 26.6422 16.025 26.6252C15.9667 26.6228 15.9103 26.6138 15.8564 26.599Z"
                                                    fill="#0D6EFD"
                                                />
                                                <path
                                                    d="M38.2364 39.7538L38.4093 40.4833L32.1467 41.9721C32.0928 41.9869 32.0364 41.9959 31.9781 41.9983C31.5642 42.0152 31.2149 41.6935 31.198 41.2796L31.9473 41.2489L31.2003 41.2782L31.0681 38.0594C28.3493 38.1765 27.636 37.7659 27.5142 35.915C27.4807 35.4055 27.5186 34.7848 27.567 33.9939C27.5807 33.7686 27.5953 33.5294 27.6091 33.2827H26.89C26.7553 33.284 26.6187 33.2492 26.495 33.1743C26.1407 32.9598 26.0273 32.4987 26.2418 32.1443L26.2425 32.1448L27.9249 29.3652C27.8577 28.8896 27.8244 28.4317 27.8244 27.9937C27.8244 26.3018 28.305 24.8347 29.236 23.7052C30.1684 22.574 31.5337 21.8037 33.2999 21.5094C33.831 21.4209 34.3917 21.375 34.9804 21.375C36.6481 21.375 38.0354 21.8158 39.129 22.5573C40.369 23.398 41.2137 24.6149 41.6509 26.0095C42.079 27.375 42.1141 28.9132 41.7437 30.4298C41.3321 32.1146 40.4186 33.7762 38.9864 35.1435V39.7425C38.992 40.0866 38.7586 40.4006 38.4099 40.4835L38.2364 39.7538Z"
                                                    fill="#0D6EFD"
                                                />
                                            </g>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="mb-0">
                                            <span className="text-dark">Client Consultation:</span> Understanding the client’s business, target audience, goals, and desired features for the website.
                                        </p>
                                    </div>
                                </div>
                                <div className="d-flex gap-3 border-bottom py-3" data-aos="fade-up" data-aos-delay={200}>
                                    <div>
                                        <svg className="fill-primary" xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48" fill="none">
                                            <path d="M32.625 15.375H14.625C12.7639 15.375 11.25 13.8611 11.25 12V6C11.25 4.13891 12.7639 2.625 14.625 2.625H32.625C34.4861 2.625 36 4.13891 36 6V12C36 13.8611 34.4861 15.375 32.625 15.375ZM14.625 4.875C14.0046 4.875 13.5 5.37964 13.5 6V12C13.5 12.6204 14.0046 13.125 14.625 13.125H32.625C33.2454 13.125 33.75 12.6204 33.75 12V6C33.75 5.37964 33.2454 4.875 32.625 4.875H14.625Z" fill="#0D6EFD" />
                                            <path d="M28.125 45.3754H10.125C8.26391 45.3754 6.75 43.8615 6.75 42.0004V36C6.75 34.1389 8.26391 32.625 10.125 32.625H28.125C29.9861 32.625 31.5 34.1389 31.5 36V42.0004C31.5 43.8615 29.9861 45.3754 28.125 45.3754ZM10.125 34.875C9.50464 34.875 9 35.3796 9 36V42.0004C9 42.6207 9.50464 43.1254 10.125 43.1254H28.125C28.7454 43.1254 29.25 42.6207 29.25 42.0004V36C29.25 35.3796 28.7454 34.875 28.125 34.875H10.125Z" fill="#0D6EFD" />
                                            <path d="M22.8749 8.25H16.1582C15.5367 8.25 15.0332 7.74646 15.0332 7.125C15.0332 6.50354 15.5367 6 16.1582 6H22.8749C23.4963 6 23.9999 6.50354 23.9999 7.125C23.9999 7.74646 23.4963 8.25 22.8749 8.25Z" fill="#0D6EFD" />
                                            <path d="M29.6249 12H16.1582C15.5367 12 15.0332 11.4965 15.0332 10.875C15.0332 10.2535 15.5367 9.75 16.1582 9.75H29.6249C30.2463 9.75 30.7499 10.2535 30.7499 10.875C30.7499 11.4965 30.2463 12 29.6249 12Z" fill="#0D6EFD" />
                                            <path d="M24.375 38.25H11.625C11.0035 38.25 10.5 37.7465 10.5 37.125C10.5 36.5035 11.0035 36 11.625 36H24.375C24.9965 36 25.5 36.5035 25.5 37.125C25.5 37.7465 24.9965 38.25 24.375 38.25Z" fill="#0D6EFD" />
                                            <path d="M16.396 42H11.625C11.0035 42 10.5 41.4965 10.5 40.875C10.5 40.2535 11.0035 39.75 11.625 39.75H16.396C17.0175 39.75 17.521 40.2535 17.521 40.875C17.521 41.4965 17.0175 42 16.396 42Z" fill="#0D6EFD" />
                                            <path d="M13.8278 25.1254H6C4.13891 25.1254 2.625 23.6115 2.625 21.7504V10.875C2.625 9.01391 4.13891 7.5 6 7.5H12.375C12.9965 7.5 13.5 8.00354 13.5 8.625C13.5 9.24646 12.9965 9.75 12.375 9.75H6C5.37964 9.75 4.875 10.2546 4.875 10.875V21.7504C4.875 22.3707 5.37964 22.8754 6 22.8754H13.8278C14.4492 22.8754 14.9528 23.3789 14.9528 24.0004C14.9528 24.6218 14.4492 25.1254 13.8278 25.1254Z" fill="#0D6EFD" />
                                            <path d="M42 40.5004H34.125C33.5035 40.5004 33 39.9968 33 39.3754C33 38.7539 33.5035 38.2504 34.125 38.2504H42C42.6204 38.2504 43.125 37.7457 43.125 37.1254V26.25C43.125 25.6296 42.6204 25.125 42 25.125H37.125C36.5035 25.125 36 24.6215 36 24C36 23.3785 36.5035 22.875 37.125 22.875H42C43.8611 22.875 45.375 24.3889 45.375 26.25V37.1254C45.375 38.9865 43.8611 40.5004 42 40.5004Z" fill="#0D6EFD" />
                                            <path d="M11.9993 27.3749C11.7499 27.3749 11.4994 27.2925 11.2907 27.1229C10.8084 26.7315 10.7351 26.0228 11.127 25.5405L12.3783 23.9999L11.127 22.4592C10.7351 21.9769 10.8084 21.2683 11.2907 20.8768C11.7737 20.485 12.4812 20.5586 12.8731 21.0405L14.7008 23.2905C15.0366 23.704 15.0366 24.2958 14.7008 24.7092L12.8731 26.9592C12.6508 27.2328 12.3263 27.3749 11.9993 27.3749Z" fill="#0D6EFD" />
                                            <path d="M35.9534 42.7495C35.6264 42.7495 35.3019 42.6074 35.0796 42.3338L33.2519 40.0838C32.916 39.6704 32.916 39.0786 33.2519 38.6651L35.0796 36.4151C35.4718 35.9335 36.1797 35.8603 36.662 36.2514C37.1443 36.6429 37.2176 37.3515 36.8257 37.8338L35.5744 39.3745L36.8257 40.9151C37.2176 41.3974 37.1443 42.106 36.662 42.4975C36.4533 42.6671 36.2024 42.7495 35.9534 42.7495Z" fill="#0D6EFD" />
                                            <path d="M34.875 17.625H19.875C18.0139 17.625 16.5 19.1389 16.5 21V27C16.5 28.8611 18.0139 30.375 19.875 30.375H34.875C36.7361 30.375 38.25 28.8611 38.25 27V21C38.25 19.1389 36.7361 17.625 34.875 17.625ZM25.8417 27H21.375C20.7535 27 20.25 26.4965 20.25 25.875C20.25 25.2535 20.7535 24.75 21.375 24.75H25.8417C26.4631 24.75 26.9667 25.2535 26.9667 25.875C26.9667 26.4965 26.4631 27 25.8417 27ZM29.8011 23.25H21.375C20.7535 23.25 20.25 22.7465 20.25 22.125C20.25 21.5035 20.7535 21 21.375 21H29.8011C30.4226 21 30.9261 21.5035 30.9261 22.125C30.9261 22.7465 30.4226 23.25 29.8011 23.25Z" fill="#0D6EFD" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="mb-0">
                                            <span className="text-dark">Project Scope:</span> Define the project requirements, including technical specifications, design preferences, functionality, and timeline.
                                        </p>
                                    </div>
                                </div>
                                <div className="d-flex gap-3 border-bottom py-3" data-aos="fade-up" data-aos-delay={400}>
                                    <div>
                                        <svg className="fill-primary" xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.54224 5.14066C8.54224 5.91869 9.17942 6.55552 9.96214 6.55552H9.97947C10.011 6.54923 10.0433 6.54597 10.0761 6.54597L19.5918 6.54591C19.6244 6.54591 19.6565 6.54915 19.6878 6.55535C20.47 6.55482 21.1058 5.91847 21.1058 5.13617C21.1058 4.35346 20.4694 3.71688 19.6867 3.71688L9.96216 3.7168C9.1864 3.7168 8.54993 4.35559 8.54224 5.14066Z" fill="#0D6EFD" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.7919 7.54102C12.1065 11.2552 12.1055 15.0108 10.7886 18.7247H18.8809C18.526 17.7187 18.2674 16.7097 18.1046 15.6992C18.0887 15.6507 18.08 15.599 18.08 15.5452L18.08 15.5422C17.8368 13.9339 17.8368 12.3223 18.08 10.7139L18.08 10.7113C18.08 10.6576 18.0887 10.6058 18.1045 10.5574C18.2668 9.55002 18.5244 8.54399 18.8775 7.54102H10.7919Z" fill="#0D6EFD" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M19.6867 19.713L9.96216 19.7129C9.1864 19.7129 8.54993 20.3518 8.54224 21.1368C8.54224 21.9148 9.17942 22.5517 9.96214 22.5517L19.6868 22.5516C20.4695 22.5516 21.1058 21.915 21.1058 21.1324C21.1058 20.3497 20.4694 19.713 19.6867 19.713Z" fill="#0D6EFD" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M19.0098 11.2051C18.846 12.4869 18.846 13.7706 19.0098 15.0525L37.5319 15.0524C38.593 15.0269 39.4364 14.1486 39.4142 13.0918C39.3911 12.0583 38.5646 11.2307 37.5317 11.2052L19.0098 11.2051Z" fill="#0D6EFD" />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M34.9034 25.9297C30.2415 26.1782 26.4933 29.9264 26.2448 34.588L28.6791 34.5879C28.9513 34.5879 29.1722 34.8089 29.1722 35.0813C29.1723 35.3536 28.9512 35.5746 28.6791 35.5744H26.2446C26.4932 40.2361 30.2414 43.9842 34.9033 44.2327L34.9034 41.8086C34.9034 41.5363 35.1242 41.3155 35.3966 41.3155C35.6689 41.3153 35.8899 41.5363 35.8899 41.8088L35.8899 44.2328C40.5519 43.9843 44.3 40.2361 44.5484 35.5744H42.1143C41.842 35.5744 41.621 35.3537 41.621 35.0813C41.621 34.8088 41.8419 34.588 42.1143 34.588L44.5484 34.5879C44.2998 29.9263 40.5516 26.1782 35.8899 25.9297L35.89 28.3633C35.89 28.6358 35.6689 28.8567 35.3967 28.8566C35.1244 28.8566 34.9033 28.6359 34.9033 28.3634L34.9034 25.9297ZM39.2975 35.5744H35.3967C35.1244 35.5744 34.9033 35.3537 34.9033 35.0813L34.9034 30.3806C34.9034 30.1081 35.1242 29.8874 35.3966 29.8874C35.6689 29.8873 35.8899 30.1083 35.8899 30.3807L35.89 34.5879H39.2975C39.5708 34.5879 39.7908 34.8089 39.7908 35.0813C39.7908 35.3536 39.5707 35.5746 39.2975 35.5744Z"
                                                fill="#0D6EFD"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M19.4597 35.0805C19.4598 31.3282 16.4075 28.2755 12.6548 28.2754C8.90289 28.2754 5.84961 31.3282 5.84961 35.0805C5.84969 38.8326 8.90273 41.8856 12.6547 41.8856C16.4075 41.8855 19.4597 38.8328 19.4597 35.0805ZM12.6547 34.5872C13.9813 34.5871 15.0603 35.6665 15.0603 36.9931C15.0604 38.1507 14.2387 39.1199 13.148 39.3481L13.1481 40.2759C13.1481 40.5482 12.927 40.7692 12.6548 40.7692C12.3823 40.7692 12.1614 40.5484 12.1614 40.2759L12.1615 39.348C11.0707 39.1198 10.249 38.1507 10.249 36.9931C10.249 36.7205 10.47 36.4998 10.7423 36.4998C11.0148 36.4997 11.2356 36.7207 11.2356 36.9931C11.2356 37.7757 11.8719 38.4125 12.6547 38.4125C13.4375 38.4124 14.0738 37.7757 14.0738 36.9931C14.0738 36.2105 13.4374 35.5738 12.6547 35.5738C11.3281 35.5736 10.249 34.4945 10.249 33.1679C10.249 32.0102 11.0707 31.0411 12.1614 30.8129L12.1615 29.8946C12.1615 29.6221 12.3823 29.4013 12.6547 29.4013C12.9271 29.4013 13.148 29.6222 13.148 29.8946L13.1481 30.8129C14.2388 31.0411 15.0603 32.0103 15.0603 33.1679C15.0604 33.4401 14.8402 33.6612 14.567 33.6612C14.2948 33.6611 14.0738 33.4403 14.0738 33.1679C14.0738 32.4129 13.4818 31.7941 12.7375 31.7511C12.7106 31.7556 12.683 31.7579 12.6548 31.7579C12.6267 31.7579 12.599 31.7556 12.5722 31.751C11.8279 31.7939 11.2356 32.413 11.2356 33.1679C11.2356 33.9504 11.8719 34.5872 12.6547 34.5872Z"
                                                fill="#0D6EFD"
                                            />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M21.8576 35.0821C21.8578 30.0075 17.7289 25.8791 12.6548 25.8789C7.58045 25.8789 3.45166 30.0076 3.45166 35.0821C3.4518 40.1565 7.58042 44.2851 12.6547 44.2851C17.729 44.2849 21.8576 40.1566 21.8576 35.0821ZM12.6547 27.2904C16.9515 27.2904 20.4463 30.7857 20.4463 35.0821C20.4463 39.3782 16.9513 42.8737 12.6548 42.8736C8.35815 42.8736 4.86301 39.3783 4.86301 35.0821C4.86309 30.7856 8.35807 27.2904 12.6547 27.2904Z" fill="#0D6EFD" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="mb-0">
                                            <span className="text-dark">Budget and Timeline:</span> Establish clear milestones, deliverables, and set a budget for the project.
                                        </p>
                                    </div>
                                </div>
                                <div className="d-flex gap-3 py-3" data-aos="fade-up" data-aos-delay={600}>
                                    <div>
                                        <svg className="fill-primary" xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48" fill="none">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M46.3438 35.4925C45.3312 36.5051 43.6745 36.5051 42.6619 35.4925L35.574 28.4046C35.106 27.9366 35.0859 27.1859 35.5135 26.6934L35.215 26.3949C34.5312 25.7112 33.5047 25.5828 32.6737 26.0772C31.7177 26.6458 30.6773 27.0871 29.5756 27.378V24.3829C33.1843 23.1017 35.7688 19.6578 35.7688 15.6097C35.7688 10.4692 31.6017 6.30183 26.4611 6.30183C21.3205 6.30183 17.1532 10.4692 17.1532 15.6097C17.1532 18.123 18.1497 20.4033 19.7688 22.0781L19.0236 23.0113C18.8449 22.986 18.6625 22.973 18.4768 22.973C17.9538 22.973 17.4549 23.0766 16.9994 23.2643C15.3056 21.1737 14.2907 18.5104 14.2907 15.6099C14.2907 8.88839 19.7397 3.43945 26.4612 3.43945C33.1827 3.43945 38.6315 8.88839 38.6315 15.6099C38.6315 17.8795 38.0102 20.0039 36.9284 21.8224C36.4342 22.6534 36.5624 23.68 37.2462 24.3637L37.5447 24.6622C38.037 24.2346 38.7879 24.2547 39.2559 24.7228L46.3438 31.8106C47.3563 32.8232 47.3563 34.48 46.3438 35.4925ZM5.28031 37.0562H1.65359C1.3954 37.0562 1.18484 37.2668 1.18484 37.525V44.0905C1.18484 44.3487 1.3954 44.5592 1.65359 44.5592H5.28031C5.5385 44.5592 5.74906 44.3487 5.74906 44.0905V37.525C5.74906 37.2668 5.5385 37.0562 5.28031 37.0562ZM12.7851 28.4H9.15837C8.90019 28.4 8.68962 28.6106 8.68962 28.8688V44.0906C8.68962 44.3488 8.90019 44.5593 9.15837 44.5593H12.7851C13.0433 44.5593 13.2538 44.3488 13.2538 44.0906V28.8688C13.2538 28.6106 13.0433 28.4 12.7851 28.4ZM20.2899 31.5994H16.6632C16.4051 31.5994 16.1945 31.81 16.1945 32.0682V44.0906C16.1945 44.3488 16.4051 44.5593 16.6632 44.5593H20.2899C20.5481 44.5593 20.7586 44.3488 20.7586 44.0906V32.0682C20.7586 31.81 20.5481 31.5994 20.2899 31.5994ZM27.7947 23.5605H24.168C23.9098 23.5605 23.6993 23.771 23.6993 24.0292V44.0906C23.6993 44.3488 23.9098 44.5593 24.168 44.5593H27.7947C28.0528 44.5593 28.2634 44.3488 28.2634 44.0906V24.0292C28.2634 23.771 28.0528 23.5605 27.7947 23.5605ZM28.5492 17.4542C28.5492 18.8727 27.3989 20.0229 25.9805 20.0229C25.6116 20.0229 25.2612 19.9445 24.9441 19.8045L20.5384 25.3216C20.8571 25.7495 21.0458 26.2799 21.0458 26.8543C21.0458 28.2727 19.8956 29.4229 18.4771 29.4229C17.0587 29.4229 15.9085 28.2727 15.9085 26.8543C15.9085 26.6477 15.9335 26.4471 15.9796 26.2546L12.8456 24.5628C12.3768 25.063 11.7108 25.3759 10.9715 25.3759C10.6077 25.3759 10.2617 25.2998 9.94803 25.1633L5.51909 30.7866C5.84253 31.2163 6.03453 31.7506 6.03453 32.3298C6.03453 33.7483 4.88431 34.8985 3.46587 34.8985C2.04744 34.8985 0.897217 33.7483 0.897217 32.3298C0.897217 30.9114 2.04744 29.7612 3.46587 29.7612C3.82953 29.7612 4.17537 29.8372 4.48887 29.9736L8.918 24.3501C8.59465 23.9205 8.40284 23.3863 8.40284 22.8072C8.40284 21.3887 9.55306 20.2385 10.9715 20.2385C12.3899 20.2385 13.5402 21.3887 13.5402 22.8072C13.5402 23.0137 13.5151 23.2143 13.469 23.4068L16.6031 25.0986C17.0718 24.5985 17.7378 24.2855 18.4771 24.2855C18.8454 24.2855 19.1952 24.3636 19.5119 24.5032L23.9186 18.9857C23.6004 18.558 23.4119 18.0281 23.4119 17.4541C23.4119 16.0357 24.5622 14.8855 25.9806 14.8855C27.399 14.8855 28.5492 16.0357 28.5492 17.4541L28.5492 17.4542ZM4.72165 32.3297C4.72165 31.6358 4.15934 31.0736 3.4655 31.0736C2.77165 31.0736 2.20934 31.6359 2.20934 32.3297C2.20934 33.0236 2.77165 33.5859 3.4655 33.5859C4.15934 33.5859 4.72165 33.0236 4.72165 32.3297ZM12.2274 22.8071C12.2274 22.1132 11.6651 21.5509 10.9712 21.5509C10.2774 21.5509 9.71506 22.1132 9.71506 22.8071C9.71506 23.5009 10.2774 24.0632 10.9712 24.0632C11.6651 24.0632 12.2274 23.5009 12.2274 22.8071ZM19.7331 26.8541C19.7331 26.1602 19.1708 25.5979 18.4769 25.5979C17.7831 25.5979 17.2208 26.1602 17.2208 26.8541C17.2208 27.5479 17.7831 28.1102 18.4769 28.1102C19.1708 28.1102 19.7331 27.5479 19.7331 26.8541ZM27.2366 17.4541C27.2366 16.7603 26.6742 16.198 25.9804 16.198C25.2866 16.198 24.7242 16.7603 24.7242 17.4541C24.7242 18.148 25.2866 18.7103 25.9804 18.7103C26.6742 18.7103 27.2366 18.148 27.2366 17.4541Z"
                                                fill="#0D6EFD"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="mb-0">
                                            <span className="text-dark">Research:</span> Analyze competitors and industry trends to ensure the website.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 px-5 py-6 bg-light-2">
                                <h6 className="mb-5 pb-3 border-bottom text-anime-style-2">Send Us Message</h6>
                                <form action="#" className="input-group">
                                    <div className="position-relative mb-3 w-100" data-aos="fade-up" data-aos-delay={0}>
                                        <input type="text" className="py-3 form-control username rounded-4 border-dark bg-white" name="name" placeholder="Your name" />
                                    </div>
                                    <div className="position-relative mb-3 w-100" data-aos="fade-up" data-aos-delay={200}>
                                        <input type="text" className="py-3 form-control email rounded-4 border-dark bg-white" name="name" placeholder="Email address" />
                                    </div>
                                    <div className="position-relative w-100" data-aos="fade-up" data-aos-delay={400}>
                                        <textarea name="message" id="message" cols={30} rows={8} className="py-3 form-control website rounded-4 border-dark bg-white" placeholder="Message" defaultValue={""} />
                                    </div>
                                    <button aria-label="submit" className="btn btn-primary w-100 mt-4 rounded-3" type="submit">
                                        <span> Get a quote </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                            <g clipPath="url(#clip0_1555_240)">
                                                <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="white" />
                                            </g>
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-8 mt-lg-0 mt-5">
                            <h3 className="text-anime-style-2">Intro service</h3>
                            <p className="wow img-custom-anim-top">In today’s fast-paced digital world, our Digital Marketing services empower businesses to connect with their audience, enhance online visibility, and achieve measurable growth. Whether you're a startup looking to establish your brand or an established business aiming to expand, we tailor strategies to meet your unique goals and challenges.</p>
                            <h6 className="text-anime-style-2">Our Comprehensive Digital Marketing Services Include</h6>
                            <p className="wow img-custom-anim-top">Our Digital Marketing Services are designed to help your brand stand out, connect with the right people, and drive measurable results. With a holistic approach and expertise across multiple channels, we craft campaigns that not only meet your goals but also exceed expectations.</p>
                            <div className="row g-4 mt-2">
                                <div className="col-md-6">
                                    <div className="p-5 h-100 border card-text" data-aos="fade-up" data-aos-delay={0}>
                                        <Link href="#" className="fs-20 fw-medium text-primary mb-3">
                                            Pay-Per-Click (PPC) Advertising
                                        </Link>
                                        <p className="mb-0">Boost visibility and drive immediate traffic with precision-targeted ads on platforms like Google, Facebook, and Instagram. We focus on optimizing cost-per-click and maximizing conversions.</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-5 h-100 border card-text" data-aos="fade-up" data-aos-delay={200}>
                                        <Link href="#" className="fs-20 fw-medium text-primary mb-3">
                                            Social Media Marketing
                                        </Link>
                                        <p className="mb-0">Build meaningful connections with your audience through engaging content, strategic campaigns, and robust advertising on platforms like Instagram, LinkedIn, and TikTok.</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-5 h-100 border card-text" data-aos="fade-up" data-aos-delay={0}>
                                        <Link href="#" className="fs-20 fw-medium text-primary mb-3">
                                            Email Marketing Campaigns
                                        </Link>
                                        <p className="mb-0">Increase customer retention and sales with customized, data-driven email campaigns that deliver the right message at the right time.</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-5 h-100 border card-text" data-aos="fade-up" data-aos-delay={200}>
                                        <Link href="#" className="fs-20 fw-medium text-primary mb-3">
                                            Content Marketing
                                        </Link>
                                        <p className="mb-0">Deliver value through SEO-optimized blogs, videos, and infographics, designed to establish authority and drive organic traffic.</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-5 h-100 border card-text" data-aos="fade-up" data-aos-delay={0}>
                                        <Link href="#" className="fs-20 fw-medium text-primary mb-3">
                                            SEO Integration
                                        </Link>
                                        <p className="mb-0">We integrate SEO best practices across all campaigns to enhance your search engine rankings and ensure your brand gets noticed.</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-5 h-100 border card-text" data-aos="fade-up" data-aos-delay={200}>
                                        <Link href="#" className="fs-20 fw-medium text-primary mb-3">
                                            Performance Tracking
                                        </Link>
                                        <p className="mb-0">Get actionable insights with our detailed performance reports, which track metrics like ROI, click-through rates, and audience engagement.</p>
                                    </div>
                                </div>
                            </div>
                            <h6 className="mt-7 text-anime-style-2">Industries We Serve</h6>
                            <p className="wow img-custom-anim-top">We work with a wide range of industries, including retail, technology, healthcare, education, finance, hospitality, and more. Whether you’re targeting local customers or a global audience, our digital marketing solutions are designed to fit.</p>
                            <ul className="ps-4">
                                <li data-aos="fade-up" data-aos-delay={0}>
                                    <p className="fw-medium">Increased website traffic</p>
                                </li>
                                <li data-aos="fade-up" data-aos-delay={200}>
                                    <p className="fw-medium">Higher engagement rates</p>
                                </li>
                                <li data-aos="fade-up" data-aos-delay={400}>
                                    <p className="fw-medium">Improved lead generation and sales</p>
                                </li>
                                <li data-aos="fade-up" data-aos-delay={600}>
                                    <p className="fw-medium">Enhanced brand visibility</p>
                                </li>
                                <li data-aos="fade-up" data-aos-delay={800}>
                                    <p className="fw-medium">Stronger customer loyalty</p>
                                </li>
                            </ul>
                            <p className="wow img-custom-anim-top">
                                Let us be your partner in navigating the ever-changing digital landscape. Together, we’ll build campaigns that not only grow your business but also create lasting connections with your audience. <br />
                                <span className="text-primary">Ready to grow your digital presence?</span> Contact us today and take the first step toward digital marketing success!
                            </p>
                            <h6 className="mt-7 mb-4 text-anime-style-2">Frequently asked question</h6>
                            <div className="accordion" style={{ opacity: 1 }}>
                                <div className="px-0 card collapse-custom mb-3 rounded-0" data-aos="fade-up" data-aos-delay={0}>
                                    <div className="p-0 card-header border-0 bg-white rounded-0">
                                        <Link className="collapsed p-3 fw-bold justify-content-between d-flex align-items-center" data-bs-toggle="collapse" href="#collapse1">
                                            <h6 className="mb-0 fs-7">
                                                <span>Education and empowerment are at the core?</span>
                                            </h6>
                                            <span className="me-3 arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapse1" className="collapse" data-bs-parent=".accordion">
                                        <p className="pe-3 fs-6 fw-regular ps-3">In addition to our core offerings, we are proud to incorporate socially responsible and sustainable practices into our investment and business strategies, ensuring that your success contributes positively to the world around you.</p>
                                    </div>
                                </div>
                                <div className="px-0 card collapse-custom mb-3 rounded-0 active" data-aos="fade-up" data-aos-delay={200}>
                                    <div className="p-0 card-header border-0 bg-white rounded-0">
                                        <Link className="p-3 fw-bold justify-content-between d-flex align-items-center" data-bs-toggle="collapse" href="#collapse2">
                                            <h6 className="mb-0 fs-7">
                                                <span>We are proud to incorporate socially responsible?</span>
                                            </h6>
                                            <span className="me-3 arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapse2" className="collapse show" data-bs-parent=".accordion">
                                        <p className="pe-3 fs-6 fw-regular ps-3">In addition to our core offerings, we are proud to incorporate socially responsible and sustainable practices into our investment and business strategies, ensuring that your success contributes positively to the world around you.</p>
                                    </div>
                                </div>
                                <div className="px-0 card collapse-custom mb-3 rounded-0" data-aos="fade-up" data-aos-delay={400}>
                                    <div className="p-0 card-header border-0 bg-white rounded-0">
                                        <Link className="collapsed p-3 fw-bold justify-content-between d-flex align-items-center" data-bs-toggle="collapse" href="#collapse3">
                                            <h6 className="mb-0 fs-7">
                                                <span>Your goals are at the center of everything?</span>
                                            </h6>
                                            <span className="me-3 arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapse3" className="collapse" data-bs-parent=".accordion">
                                        <p className="pe-3 fs-6 fw-regular ps-3">In addition to our core offerings, we are proud to incorporate socially responsible and sustainable practices into our investment and business strategies, ensuring that your success contributes positively to the world around you.</p>
                                    </div>
                                </div>
                                <div className="px-0 card collapse-custom mb-3 rounded-0" data-aos="fade-up" data-aos-delay={600}>
                                    <div className="p-0 card-header border-0 bg-white rounded-0">
                                        <Link className="collapsed p-3 fw-bold justify-content-between d-flex align-items-center" data-bs-toggle="collapse" href="#collapse4">
                                            <h6 className="mb-0 fs-7">
                                                <span>Join countless individuals and businesses?</span>
                                            </h6>
                                            <span className="me-3 arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapse4" className="collapse" data-bs-parent=".accordion">
                                        <p className="pe-3 fs-6 fw-regular ps-3">In addition to our core offerings, we are proud to incorporate socially responsible and sustainable practices into our investment and business strategies, ensuring that your success contributes positively to the world around you.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
