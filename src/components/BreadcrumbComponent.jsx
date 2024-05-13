import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { useLocation } from 'react-router-dom'
import { Student, User, House, Folder, File } from '@phosphor-icons/react'

const iconMapping = {
    dashboard: House,
    lecturer: Student,
    student: User,
    course: Folder,
    attentdance: File
}

const BreadcrumbComponent = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    const user = pathnames.shift().toLowerCase();
    // console.log(pathnames)
    // console.log(location)

    return (
        <div className='flex  w-max px-4 rounded-lg'>
            <Breadcrumbs maxItems={3} itemsBeforeCollapse={1} itemsAfterCollapse={2}
                itemClasses={{
                    separator: " pl-4",
                }} >
                {pathnames.map((value, index) => {
                    const to = `/${user}/${pathnames.slice(0, index + 1).join('/')}`;
                    const Icon = iconMapping[value.toLowerCase()] || null;
                    // console.log(to)
                    return (
                        <BreadcrumbItem key={index} href={to} className="p-2 group">
                            <Icon size={24} weight="thin" />
                            <span className='capitalize p-2 font-extralight font-poppins text-lg hover:underline sm:flex hidden'>{value}</span>
                        </BreadcrumbItem>
                    )
                })}
            </Breadcrumbs>
        </div>
    )
}

export default BreadcrumbComponent