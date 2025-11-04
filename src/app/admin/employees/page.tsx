import {
  EmployersEmployeesPageProps,
  employersPageFallbackData,
} from "@/app/(employer-employees)/_config";
import EmployeesEmployersInput from "@/components/admin/employees-employers-input";
import { ImageLibraryProvider } from "@/contexts/ImageLibraryContext";
import getPage from "@/server-actions/page";

export default async function EmployeesAdmin() {
  const employeesPage = await getPage<EmployersEmployeesPageProps>(
    "employees",
    {
      ...employersPageFallbackData,
      slug: "employees",
    },
  );

  return (
    <ImageLibraryProvider>
      <div>
        <EmployeesEmployersInput data={employeesPage} />
      </div>
    </ImageLibraryProvider>
  );
}
