import Link from "next/link";

export default function Section6({ background }: any) {
    return (
        <>
            {/*coworking-space-home section 6*/}
            <section className={`coworking-space-home-section-6 position-relative overflow-hidden py-120 ${background}`}>
                <div className="container">
                    <div className="mb-80 d-flex flex-wrap gap-4 align-items-center justify-content-between">
                        <div className="text-start">
                            <h2 className="stroke text-white text-start pb-2 mb-0 text-anime-style-2">Seat price for</h2>
                            <h2 className="text-anime-style-2">co-working desk</h2>
                        </div>
                        <div className="d-flex justify-content-lg-end">
                            <ul className="list-unstyled d-flex align-items-center change-price-plan py-1 shadow-2">
                                <li>
                                    <Link href="#" className="btn-change-price active monthly btn-text" data-type="monthly">
                                        monthly
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="btn-change-price yearly btn-text" data-type="yearly">
                                        yearly
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row g-lg-5">
                        <div className="col-lg-6">
                            <div className="card-pricing bg-white border border-dark p-md-7 p-5 mb-lg-0 mb-5" data-aos="fade-up" data-aos-delay={200}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="d-flex flex-column h-100">
                                            <svg className="mb-md-auto mb-5" xmlns="http://www.w3.org/2000/svg" width={100} height={100} viewBox="0 0 100 100" fill="none">
                                                <g clipPath="url(#clip0_349_2655)">
                                                    <path className="fill-primary" d="M25.4372 27.0052L16.7736 27.6746C14.3628 27.8609 12.2158 29.1244 10.8826 31.141L0.891057 46.2526C-0.120067 47.7818 -0.280808 49.6957 0.460787 51.3722C1.20258 53.0488 2.72698 54.2171 4.53849 54.4978L12.471 55.7263C14.3267 45.8787 18.7688 36.0554 25.4372 27.0052Z" fill="#0D6EFD" />
                                                    <path className="fill-primary" d="M44.2734 87.5289L45.5021 95.4614C45.7828 97.2729 46.9512 98.7973 48.6275 99.5389C49.325 99.8475 50.0632 99.9998 50.7978 99.9998C51.8296 99.9998 52.8542 99.6993 53.7474 99.1086L68.8594 89.1173C70.876 87.7839 72.1394 85.6367 72.3254 83.2263L72.9947 74.5627C63.9444 81.2312 54.1212 85.6734 44.2734 87.5289Z" fill="#0D6EFD" />
                                                    <path className="fill-primary" d="M41.2901 82.0306C41.5655 82.0306 41.8424 82.008 42.1188 81.9619C46.2445 81.272 50.2211 80.1099 54.0144 78.5889L21.4111 45.9856C19.8901 49.7787 18.728 53.7553 18.0381 57.8812C17.7662 59.5076 18.3117 61.1644 19.4776 62.3304L37.6696 80.5224C38.6376 81.4902 39.944 82.0306 41.2901 82.0306Z" fill="#0D6EFD" />
                                                    <path
                                                        d="M92.0262 44.3362C100.004 28.9117 100.3 12.6118 99.883 4.96734C99.7402 2.34803 97.6519 0.259764 95.0324 0.116991C93.7877 0.049023 92.3125 0 90.6498 0C82.1019 0 68.5764 1.29472 55.6636 7.97376C45.4016 13.2817 31.9452 24.9693 24.0062 40.329C24.1 40.4022 24.1916 40.48 24.2779 40.5663L59.4339 75.7223C59.5202 75.8086 59.5977 75.9 59.671 75.9937C75.0306 68.0545 86.7182 54.5982 92.0262 44.3362ZM58.1437 21.1405C63.8547 15.4294 73.1478 15.4288 78.8593 21.1405C81.6261 23.907 83.1497 27.5857 83.1497 31.4984C83.1497 35.411 81.6261 39.0897 78.8593 41.8563C76.0041 44.7116 72.2521 46.1395 68.5016 46.1399C64.7499 46.1401 60.9997 44.7123 58.1437 41.8563C55.3769 39.0897 53.8531 35.411 53.8531 31.4984C53.8531 27.5857 55.3769 23.907 58.1437 21.1405Z"
                                                        fill="#292929"
                                                    />
                                                    <path className="fill-primary" d="M62.2869 37.7131C65.7136 41.1399 71.2898 41.1401 74.7166 37.7131C76.3765 36.053 77.2908 33.8459 77.2908 31.4983C77.2908 29.1506 76.3765 26.9436 74.7166 25.2836C73.0033 23.5701 70.7525 22.7135 68.5017 22.7135C66.2511 22.7135 64.0003 23.5701 62.2871 25.2836C60.6271 26.9436 59.7126 29.1506 59.7126 31.4983C59.7126 33.8459 60.6269 36.0532 62.2869 37.7131Z" fill="#0D6EFD" />
                                                    <path d="M2.98923 82.4093C3.73904 82.4093 4.48884 82.1233 5.06072 81.5511L14.6258 71.986C15.7699 70.8419 15.7699 68.987 14.6258 67.8428C13.4818 66.6987 11.6267 66.6987 10.4826 67.8428L0.917554 77.4079C-0.226587 78.552 -0.226587 80.4069 0.917554 81.5511C1.48962 82.1231 2.23943 82.4093 2.98923 82.4093Z" fill="#292929" />
                                                    <path d="M23.3917 76.6086C22.2477 75.4645 20.3926 75.4645 19.2485 76.6086L0.858838 94.9982C-0.285303 96.1424 -0.285303 97.9973 0.858838 99.1414C1.43091 99.7135 2.18071 99.9994 2.93052 99.9994C3.68032 99.9994 4.43013 99.7135 5.002 99.1412L23.3915 80.7518C24.5358 79.6076 24.5358 77.7527 23.3917 76.6086Z" fill="#292929" />
                                                    <path d="M28.0139 85.3743L18.449 94.9394C17.3049 96.0835 17.3049 97.9384 18.449 99.0825C19.0211 99.6546 19.7709 99.9408 20.5205 99.9408C21.2701 99.9408 22.0201 99.6548 22.592 99.0825L32.1571 89.5175C33.3012 88.3734 33.3012 86.5185 32.1571 85.3743C31.0131 84.2302 29.158 84.2302 28.0139 85.3743Z" fill="#292929" />
                                                </g>
                                            </svg>
                                            <span className="btn-text opacity-50">Personal</span>
                                            <h1 className="mb-3 mt-1 text-price-standard">$49</h1>
                                            <p className="fs-7">
                                                Best for small business owners, <br />
                                                startups who needs.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 ps-md-7 border-start-md mt-md-0 mt-4">
                                        <span className="btn-text">What’s included:</span>
                                        <ul className="list-unstyled mt-3 mb-0">
                                            <li className="d-flex align-items-center border-top py-3">
                                                <i className="ri-check-line text-primary" />
                                                <p className="fs-7 mb-0 ms-3">1x entry ticket</p>
                                            </li>
                                            <li className="d-flex align-items-center border-top py-3">
                                                <i className="ri-check-line text-primary" />
                                                <p className="fs-7 mb-0 ms-3">Free buffet &amp; liflet</p>
                                            </li>
                                            <li className="d-flex align-items-center border-top py-3">
                                                <i className="ri-check-line text-primary" />
                                                <p className="fs-7 mb-0 ms-3">Social media share audit</p>
                                            </li>
                                            <li className="d-flex align-items-center border-top pt-3">
                                                <i className="ri-check-line text-primary" />
                                                <p className="fs-7 mb-0 ms-3">24/7 online support</p>
                                            </li>
                                        </ul>
                                        <Link href="#" className="btn btn-primary mt-5 mb-3 w-100 hover-up">
                                            purchase now
                                        </Link>
                                        <p className="fs-7 mb-0">24/7 online support</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card-pricing bg-white border border-primary position-relative p-md-7 p-5 mb-lg-0 mb-5" data-aos="fade-up" data-aos-delay={400}>
                                <span className="tag-recommended position-absolute btn-text text-white">recommended</span>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="d-flex flex-column h-100">
                                            <svg className="mb-md-auto mb-5" xmlns="http://www.w3.org/2000/svg" width={100} height={100} viewBox="0 0 100 100" fill="none">
                                                <g clipPath="url(#clip0_349_2680)">
                                                    <path d="M97.069 94.1405H93.944V36.3288C93.944 34.7109 92.6323 33.3992 91.0144 33.3992H79.2958C77.6778 33.3992 76.3661 34.7109 76.3661 36.3288V94.1405H70.5069V55.8598C70.5069 54.2419 69.1952 52.9302 67.5772 52.9302H55.8586C54.2407 52.9302 52.929 54.2419 52.929 55.8598V94.1405H47.0697V66.6018C47.0697 64.9839 45.758 63.6722 44.14 63.6722H32.4214C30.8035 63.6722 29.4918 64.9839 29.4918 66.6018V94.1405H23.6325V73.633C23.6325 72.015 22.3208 70.7033 20.7028 70.7033H8.98425C7.36631 70.7033 6.05461 72.015 6.05461 73.633V94.1405H2.92965C1.3117 94.1405 0 95.4522 0 97.0702C0 98.6881 1.3117 99.9998 2.92965 99.9998H97.069C98.6869 99.9998 99.9986 98.6881 99.9986 97.0702C99.9986 95.4522 98.6869 94.1405 97.069 94.1405Z" fill="#292929" />
                                                    <path className="fill-primary" d="M2.92965 62.9501C21.2142 62.9501 41.0424 56.3834 58.7621 44.4595C72.6398 35.1208 84.2082 23.1907 91.3941 10.9747L94.2393 21.5931C94.5901 22.902 96.2836 24.0329 97.8274 23.6645C99.4012 23.2891 100.318 21.6394 99.8988 20.0765L95.1014 2.17243C94.6825 0.609754 93.0768 -0.317967 91.5134 0.100972L73.6093 4.89837C72.0465 5.31711 71.1191 6.92354 71.5379 8.48641C71.9568 10.0493 73.5625 10.977 75.1259 10.5579L86.6599 7.46728C79.9559 19.1167 68.8764 30.5908 55.4908 39.5983C38.7278 50.8786 20.0612 57.0908 2.92965 57.0908C1.3117 57.0908 0 58.4025 0 60.0205C0 61.6384 1.3117 62.9501 2.92965 62.9501Z" fill="#0D6EFD" />
                                                </g>
                                            </svg>
                                            <span className="btn-text opacity-50">business (Sponsor)</span>
                                            <h1 className="mb-3 mt-1 text-price-business">$199</h1>
                                            <p className="fs-7">
                                                Best for small business owners, <br />
                                                startups who needs.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 ps-md-7 border-start-md mt-md-0 mt-4">
                                        <span className="btn-text">What’s included:</span>
                                        <ul className="list-unstyled mt-3 mb-0">
                                            <li className="d-flex align-items-center border-top py-3">
                                                <i className="ri-check-line text-primary" />
                                                <p className="fs-7 mb-0 ms-3">10x entry ticket</p>
                                            </li>
                                            <li className="d-flex align-items-center border-top py-3">
                                                <i className="ri-check-line text-primary" />
                                                <p className="fs-7 mb-0 ms-3">Free buffet &amp; liflet</p>
                                            </li>
                                            <li className="d-flex align-items-center border-top py-3">
                                                <i className="ri-check-line text-primary" />
                                                <p className="fs-7 mb-0 ms-3">Gold sponsor</p>
                                            </li>
                                            <li className="d-flex align-items-center border-top pt-3">
                                                <i className="ri-check-line text-primary" />
                                                <p className="fs-7 mb-0 ms-3">10 min stage talk</p>
                                            </li>
                                        </ul>
                                        <Link href="#" className="btn btn-dark mt-5 mb-3 w-100 hover-up">
                                            purchase now
                                        </Link>
                                        <p className="fs-7 mb-0">24/7 online support</p>
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
