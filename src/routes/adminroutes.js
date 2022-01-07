import AdminIndex from "../components/admin/AdminIndex";

const adminroutes = [
    {path: '/admin', exact: true, name: 'Admin', component: AdminIndex},
    // {path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard},
];

export default adminroutes;