import getPage from "@/server-actions/page";
import Hero from "@/components/empoyers-employees/Hero";
import Section2 from "@/components/empoyers-employees/Section2";
import Section3 from "@/components/empoyers-employees/Section3";
import {
  EmployersEmployeesPageProps,
  employersPageFallbackData,
} from "../_config";
import Section4 from "@/components/empoyers-employees/Section4";
import Section5 from "@/components/empoyers-employees/Section5";
import Section6 from "@/components/empoyers-employees/Section6";
import Section7 from "@/components/empoyers-employees/Section7";
import Section8 from "@/components/empoyers-employees/Section8";

export default async function EmployersPage() {
  const data = await getPage<EmployersEmployeesPageProps>(
    "employers",
    employersPageFallbackData,
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
				   SECTION 2
        ****************************************************************/}
          <Section2 content={data.content} />
          <Section3 content={data.content} />
          <Section4 content={data.content} isEmployersPage={true} />
          <Section5 content={data.content} />
          <Section6 content={data.content} />
          <Section7 content={data.content} />
          <Section8 content={data.content} />
        </div>
      </div>
    </main>
  );
}
