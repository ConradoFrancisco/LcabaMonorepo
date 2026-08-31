'use client';
import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSidebar } from '../context/SidebarContext';
import { useAuth } from '@/context/AuthContext';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Megaphone,
  Newspaper,
  MoreHorizontal,
  LogOut,
  Cog,
  ShieldCheck,
} from 'lucide-react';

type NavItem = {
  title: string;
  icon?: React.ReactNode;
  url?: string;
  perfil?: string;
  description?: string;
  shortdesc?: string;
  subItems?: {
    title: string;
    url: string;
    pro?: boolean;
    new?: boolean;
    description?: string;
    perfil?: string;
    shortdesc?: string;
  }[];
};

const othersItems: NavItem[] = [
  /*  {
     icon: <PieChartIcon />,
     name: "Charts",
     subItems: [
       { name: "Line Chart", path: "/line-chart", pro: false },
       { name: "Bar Chart", path: "/bar-chart", pro: false },
     ],
   },
   {
     icon: <BoxCubeIcon />,
     name: "UI Elements",
     subItems: [
       { name: "Alerts", path: "/alerts", pro: false },
       { name: "Avatar", path: "/avatars", pro: false },
       { name: "Badge", path: "/badge", pro: false },
       { name: "Buttons", path: "/buttons", pro: false },
       { name: "Images", path: "/images", pro: false },
       { name: "Videos", path: "/videos", pro: false },
     ],
   },
   {
     icon: <PlugInIcon />,
     name: "Authentication",
     subItems: [
       { name: "Sign In", path: "/signin", pro: false },
       { name: "Sign Up", path: "/signup", pro: false },
     ],
   }, */
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, toggleSidebar } = useSidebar();
  const { logout } = useAuth();
  const menuTitleRef = useRef<HTMLHeadingElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const [toggleBtnTop, setToggleBtnTop] = useState(128);
  const [hoveredItem, setHoveredItem] = useState<{ top: number; title: string } | null>(null);
  const [flyoutSubmenu, setFlyoutSubmenu] = useState<{
    top: number;
    title: string;
    items: NonNullable<NavItem['subItems']>;
  } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      if (menuTitleRef.current) {
        setToggleBtnTop(
          menuTitleRef.current.offsetTop + menuTitleRef.current.offsetHeight / 2 - 10
        );
      }
    };
    measure();
    const timer = setTimeout(measure, 310);
    return () => clearTimeout(timer);
  }, [isExpanded, isMobileOpen]);

  useEffect(() => {
    if (isExpanded || isMobileOpen) setFlyoutSubmenu(null);
  }, [isExpanded, isMobileOpen]);

  useEffect(() => {
    if (!flyoutSubmenu) return;
    const close = () => setFlyoutSubmenu(null);
    const id = setTimeout(() => document.addEventListener('click', close), 0);
    return () => {
      clearTimeout(id);
      document.removeEventListener('click', close);
    };
  }, [flyoutSubmenu]);
  const [navItems] = useState<NavItem[]>([
    /* ,

    {
      icon: <MessageCircle />,
      title: "DG. Participación Ciudadana",
      subItems: [
        { title: "DGPC Campaña Inscripción", url: "/dgpc/ins", pro: false },
        { title: "DGPC Inscripciones Tipos", url: "/dgpc/tipos", pro: false },
        { title: "Notificaciones", url: "/dgpc/publicaciones", pro: false },
        { title: "Tipo de Notificaciones", url: "/dgpc/publicaciones/tipos", pro: false },

      ]
    },

    {
      icon: <Keyboard />,
      title: "DG. Taquigrafos",
      subItems: [
        { title: "Versiones Taquigráficas", url: "/taquigrafos", pro: false },

      ]
    },  

    {
      title: "DG. Compras",
      icon: <CircleDollarSign />,
      subItems: [{ title: "Contrataciones", url: "/compras/contrataciones", pro: false },
      {
        title: "Licitaciones",
        url: "/compras/licitaciones",
        pro: false
      }
      ],
    },

    {
      title: "ABM usuarios Backend",
      icon: <Contact />,
      subItems: [
        { title: "Jefes Dependencias", url: "/blank", pro: false },
      ],
    },

    {
      title: "Composicion Actual",
      icon: <Users />,
      subItems: [
        { title: "Listado de funcionarios", url: "/funcionarios/listado", pro: false },
        { title: "Tipo de Area agrupada", url: "/funcionarios/tipos", pro: false }
      ],
    },

    {
      icon: <GraduationCap />,
      title: "ILCP",
      subItems: [
        { title: "Beneficios", url: "/ilcp/beneficios", pro: false },
        { title: "Cursos", url: "/ilcp/cursos", pro: false },
        { title: "Docentes", url: "/ilcp/docentes", pro: false },
        { title: "Cursos - Tipo", url: "/ilcp/cursos/tipos", pro: false },
        { title: "Cursos - Categorías", url: "/ilcp/cursos/categorias", pro: false },
        { title: "Cursos - Salones", url: "/ilcp/cursos/salones", pro: false },
        { title: "Origen Inscripto", url: "/ilcp/origen", pro: false },
        { title: "Inscripciones", url: "/ilcp/inscripciones", pro: false },
        { title: "Publicaciones", url: "/ilcp/posts", pro: false },
        { title: "Publicaciones Tipo", url: "/ilcp/posts/tipos", pro: false },
        { title: "Módulos", url: "/ilcp/modulos", pro: false },
        { title: "Usuarios Registrados ILCP", url: "/s", pro: false },
        { title: "Cursos - Ciclos Lectivos", url: "/s", pro: false },
      ],
    },

    {
      icon: <Network />,
      title: "Relaciones Backend",
      subItems: [
        { title: "ABM Usuarios", url: "/s", pro: false },
        { title: "ABM de menues del backend", url: "/s", pro: false },
        { title: "Permisos de Sección según Rol", url: "/s", pro: false },
        { title: "Grupos Active Directory", url: "/s", pro: false },
      ],
    },*/
    {
      icon: <Cog />,
      title: 'Configuración general',
      subItems: [
        { title: 'Pagina', url: '/general/paginas', pro: false },
        { title: 'Secciones de la página', url: '/general/secciones', pro: false },
        { title: 'Varios', url: '/general/banners', pro: false },
        { title: 'Textos informativos', url: '/general/textos', pro: false },
        { title: 'Usuarios registrados', url: '/general/usuarios-registrados', pro: false },
        { title: 'Actividad media', url: '/general/actividad-media', pro: false },
        { title: 'Cuestionarios generales', url: '/general/cuestionarios-grales', pro: false },
      ],
    },
    {
      icon: <Newspaper />,
      title: 'Revista LCABA',
      subItems: [
        { title: 'Publicaciones', url: '/revista/publicaciones', pro: false },
        { title: 'Tipo de publicaciones', url: '/revista/tipos', pro: false },
        { title: 'Revistas', url: '/revista/revistas', pro: false },
        { title: 'Categorías revista', url: '/revista/categorias', pro: false },
      ],
    },

    {
      icon: <BookOpen />,
      title: 'DG. Cultura',
      subItems: [
        { title: 'Publicaciones', url: '/cultura/publicaciones', pro: false },
        { title: 'Categorías', url: '/cultura/categorias', pro: false },
        { title: 'Tipo de publicaciones', url: '/cultura/tipos', pro: false },
      ],
    },
    {
      title: 'DG. Prensa y difusión',
      icon: <Megaphone />,
      subItems: [
        { title: 'Publicaciones', url: '/prensa/publicaciones', pro: false },
        { title: 'Tipo de noticia', url: '/prensa/tipos', pro: false },
        { title: 'Gacetillas', url: '/prensa/gacetillas', pro: false },
        { title: 'Suscriptores', url: '/prensa/suscriptores', pro: false },
      ],
    },
    {
      icon: <ShieldCheck />,
      title: 'OIP',
      subItems: [
        { title: 'Informes', url: '/oip/informes', pro: false },
        { title: 'Tipo de Informes', url: '/oip/tipos', pro: false },
      ],
    },
  ]);

  const pathname = usePathname();

  const renderMenuItems = (navItems: NavItem[], menuType: 'main' | 'others') => {
    const collapsed = !isExpanded && !isHovered && !isMobileOpen;
    return (
      <ul className="flex flex-col gap-4">
        {navItems.map((nav, index) => {
          const isGroupActive = nav.subItems?.some((subItem) => isActive(subItem.url)) ?? false;
          return (
            <li key={nav.title}>
              {nav.subItems ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (collapsed) {
                      const btn = e.currentTarget;
                      const aside = asideRef.current;
                      if (aside && nav.subItems) {
                        const btnRect = btn.getBoundingClientRect();
                        const asideRect = aside.getBoundingClientRect();
                        const top = btnRect.top - asideRect.top + btn.offsetHeight / 2;
                        setFlyoutSubmenu((prev) =>
                          prev?.title === nav.title
                            ? null
                            : { top, title: nav.title, items: nav.subItems! }
                        );
                      }
                      return;
                    }
                    handleSubmenuToggle(index, menuType);
                  }}
                  onMouseEnter={(e) => {
                    if (collapsed) {
                      const btn = e.currentTarget;
                      const aside = asideRef.current;
                      if (aside) {
                        const btnRect = btn.getBoundingClientRect();
                        const asideRect = aside.getBoundingClientRect();
                        setHoveredItem({
                          top: btnRect.top - asideRect.top + btn.offsetHeight / 2,
                          title: nav.title,
                        });
                      }
                    }
                  }}
                  onMouseLeave={() => collapsed && setHoveredItem(null)}
                  className={`menu-item group ${openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? 'menu-item-active'
                    : 'menu-item-inactive'
                    } ${collapsed ? 'cursor-pointer lg:justify-center' : 'cursor-pointer lg:justify-start'}`}
                >
                  <span
                    className={`${openSubmenu?.type === menuType && openSubmenu?.index === index
                      ? 'menu-item-icon-active'
                      : collapsed && isGroupActive
                        ? 'text-brand-500'
                        : 'menu-item-icon-inactive'
                      }`}
                  >
                    {nav.icon}
                  </span>
                  {!collapsed && (
                    <span className="menu-item-text flex-1 text-left">{nav.title}</span>
                  )}
                  {!collapsed && (
                    <ChevronDown
                      className={`ml-auto h-5 w-5 transition-transform duration-200 ${openSubmenu?.type === menuType && openSubmenu?.index === index
                        ? 'text-brand-500 rotate-180'
                        : ''
                        }`}
                    />
                  )}
                </button>
              ) : (
                nav.url && (
                  <Link
                    href={nav.url}
                    className={`menu-item group ${isActive(nav.url) ? 'menu-item-active' : 'menu-item-inactive'
                      } ${collapsed ? 'pointer-events-none' : ''}`}
                  >
                    <span
                      className={`${isActive(nav.url) ? 'menu-item-icon-active' : 'menu-item-icon-inactive'
                        }`}
                    >
                      {nav.icon}
                    </span>
                    {!collapsed && (
                      <span className="menu-item-text flex-1 text-left">{nav.title}</span>
                    )}
                  </Link>
                )
              )}
              {nav.subItems && !collapsed && (
                <div
                  ref={(el) => {
                    subMenuRefs.current[`${menuType}-${index}`] = el;
                  }}
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    height:
                      openSubmenu?.type === menuType && openSubmenu?.index === index
                        ? `${subMenuHeight[`${menuType}-${index}`]}px`
                        : '0px',
                  }}
                >
                  <ul className="mt-2 ml-9 space-y-1">
                    {nav.subItems.map((subItem) => (
                      <li key={subItem.title}>
                        <Link
                          href={subItem.url ? subItem.url : '/asset'}
                          className={`menu-dropdown-item ${isActive(subItem.url)
                            ? 'menu-dropdown-item-active'
                            : 'menu-dropdown-item-inactive'
                            }`}
                        >
                          {subItem.title}
                          <span className="ml-auto flex items-center gap-1">
                            {subItem.new && (
                              <span
                                className={`ml-auto ${isActive(subItem.url)
                                  ? 'menu-dropdown-badge-active'
                                  : 'menu-dropdown-badge-inactive'
                                  } menu-dropdown-badge`}
                              >
                                new
                              </span>
                            )}
                            {subItem.pro && (
                              <span
                                className={`ml-auto ${isActive(subItem.url)
                                  ? 'menu-dropdown-badge-active'
                                  : 'menu-dropdown-badge-inactive'
                                  } menu-dropdown-badge`}
                              >
                                pro
                              </span>
                            )}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: 'main' | 'others';
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => path === pathname;
  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    // Check if the current path matches any submenu item
    let submenuMatched = false;
    ['main', 'others'].forEach((menuType) => {
      const items = menuType === 'main' ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.url)) {
              setOpenSubmenu({
                type: menuType as 'main' | 'others',
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    // If no submenu item matches, close the open submenu
    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive, navItems]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: 'main' | 'others') => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (prevOpenSubmenu && prevOpenSubmenu.type === menuType && prevOpenSubmenu.index === index) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  /* useEffect(()=>{
    const fetchNavItems = async () =>{
      const response = await MenuService.getSideMenu();
      setNavItems(response);
    }
    fetchNavItems();
  },[]) */
  return (
    <aside
      ref={asideRef}
      className={`fixed top-0 left-0 z-50 flex h-screen flex-col border-r border-gray-200 bg-white px-5 text-gray-900 transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900 ${isExpanded || isMobileOpen ? 'w-[290px]' : isHovered ? 'w-[290px]' : 'w-[90px]'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
    >
      <div
        className={`flex py-8 ${!isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'}`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src="/images/logo/logoLegislatura.png"
                alt="Logo"
                width={225}
                height={60}
              />
              <Image
                className="hidden dark:block"
                src="/images/logo/logoLegislatura.png"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <Image src="/images/logo/logitoLegis.png" alt="Logo" width={32} height={32} />
          )}
        </Link>
      </div>
      <div className="no-scrollbar flex flex-1 flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                ref={menuTitleRef}
                className={`mb-4 flex text-xs leading-[20px] text-gray-400 uppercase ${!isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'
                  }`}
              >
                {isExpanded || isHovered || isMobileOpen ? 'Menu' : <MoreHorizontal />}
              </h2>
              {renderMenuItems(navItems, 'main')}
            </div>

            <div className="hidden">
              <h2
                className={`mb-4 flex text-xs leading-[20px] text-gray-400 uppercase ${!isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'
                  }`}
              >
                {isExpanded || isHovered || isMobileOpen ? 'Others' : <MoreHorizontal />}
              </h2>
              {renderMenuItems(othersItems, 'others')}
            </div>
          </div>
        </nav>
      </div>
      <div
        className={`border-t border-gray-200 py-4 dark:border-gray-800 ${!isExpanded && !isHovered ? 'lg:flex lg:justify-center' : ''}`}
      >
        <div className="group/logout relative">
          <Link
            onClick={logout}
            href="/login"
            className={`group text-theme-sm flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300 ${!isExpanded && !isHovered ? 'lg:justify-center' : ''}`}
          >
            <LogOut
              className="fill-gray-500 group-hover:fill-gray-700 dark:group-hover:fill-gray-300"
              width="24"
              height="24"
            />
            {(isExpanded || isHovered || isMobileOpen) && <span>Cerrar sesión</span>}
          </Link>
          {!isExpanded && !isHovered && !isMobileOpen && (
            <span className="pointer-events-none absolute top-1/2 left-full z-10 ml-3 hidden -translate-y-1/2 rounded bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover/logout:opacity-100 lg:block dark:bg-gray-700">
              Cerrar sesión
            </span>
          )}
        </div>
      </div>
      <div
        className="group/toggle absolute z-[60] hidden lg:block"
        style={{ top: toggleBtnTop, right: '-10px' }}
      >
        <button
          onClick={toggleSidebar}
          className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
        >
          {isExpanded ? (
            <ChevronLeft className="h-3 w-3 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronRight className="h-3 w-3 text-gray-500 dark:text-gray-400" />
          )}
        </button>
        <span className="pointer-events-none absolute top-1/2 left-[calc(100%+8px)] -translate-y-1/2 rounded bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover/toggle:opacity-100 dark:bg-gray-700">
          {isExpanded ? 'Colapsar' : 'Ampliar'}
        </span>
      </div>
      {hoveredItem && !flyoutSubmenu && (
        <div
          className="pointer-events-none absolute left-full z-[70] ml-3 hidden -translate-y-1/2 rounded bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white lg:block dark:bg-gray-700"
          style={{ top: hoveredItem.top }}
        >
          {hoveredItem.title}
        </div>
      )}
      {flyoutSubmenu && (
        <div
          className="absolute left-full z-[70] ml-3 hidden min-w-[240px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl lg:block dark:border-gray-700 dark:bg-gray-900"
          style={{ top: flyoutSubmenu.top, transform: 'translateY(-50%)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/60">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              {flyoutSubmenu.title}
            </span>
          </div>
          <ul className="max-h-[60vh] overflow-y-auto py-2">
            {flyoutSubmenu.items.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.url || '/asset'}
                  onClick={() => setFlyoutSubmenu(null)}
                  className={`flex items-center border-l-2 px-4 py-2.5 text-sm transition-colors ${isActive(item.url)
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 font-medium'
                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-white/5 dark:hover:text-white'
                    }`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
};

export default AppSidebar;
