import Hero from "@/components/empoyers-employees/Hero";
import Section2Employees from "@/components/empoyers-employees/Section2Employees";
import Section3 from "@/components/empoyers-employees/Section3";
import Section4 from "@/components/empoyers-employees/Section4";
import Section5Employees from "@/components/empoyers-employees/Section5Employees";
// import Section6 from "@/components/empoyers-employees/Section6";
import Section7 from "@/components/empoyers-employees/Section7";
import Section7aEmployees from "@/components/empoyers-employees/Section7aEmployees";
import Section8 from "@/components/empoyers-employees/Section8";
import Section9 from "@/components/empoyers-employees/Section9";
import getPage from "@/server-actions/page";
import {
  employeesPageFallbackData,
  EmployersEmployeesPageProps,
} from "../_config";

export default async function EmployeesPage() {
  const data = await getPage<EmployersEmployeesPageProps>(
    "employees",
    employeesPageFallbackData,
  );

  return (
    <main className="min-h-screen">
      <div className="max-w-[1920px] mx-auto lg:px-8 py-4 pt-24">
        {/* ***************************************************************
				   HERO
        ****************************************************************/}
        <Hero content={data.content} />
        <div className="max-w-[1540px] mx-auto">
          {/* ***************************************************************
				   SECTION 2 - Employees Only
        ****************************************************************/}
          <Section2Employees content={data.content} />
          <Section5Employees content={data.content} />
          <Section4 content={data.content} />
          <Section3 content={data.content} />
          {/* <Section6 content={data.content} /> */}
          <Section7aEmployees content={data.content} />
          <Section7 content={data.content} />
          <Section9 content={data.content} />
          <Section8 content={data.content} />
        </div>
      </div>
    </main>
  );
}
