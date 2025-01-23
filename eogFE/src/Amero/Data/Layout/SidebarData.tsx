import { MenuItem } from "@Types/LayoutTypes"

export const UserListData = [
    {
        icon: "Profile",
        text: "Perfil",
        href: "/usuarios/perfil",
    }
]

export const MenuList: MenuItem[] | undefined = [
    {
        title: "General",
        Items: [
            {
                title: "Resumen",
                icon: "Home-dashboard",
                path: "/resumen",
            }
        ],
    },
    {
        title: "Gestion",
        Items: [
            {
                title: "Tickets",
                icon: "Ticket",
                path: "/tickets",
            },
            {
                title: "Luminarias",
                icon: "Discovery",
                path: "/luminarias",
            }
        ]
    },
    {
        title: "Configuracion",
        Items: [
            {
                title: "Usuarios",
                icon: "Profile",
                path: "/usuarios",
            },
            {
                title: "Roles",
                icon: "Shield",
                path: "/roles",
            }
        ]
    }
]
