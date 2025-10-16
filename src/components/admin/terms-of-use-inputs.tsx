/* ************************************************************
                        NOTES
************************************************************ */
// Terms of Use admin inputs component
// Features: Individual input fields for each terms of use section
// Layout: Matches home inputs styling with sections and fields
/* ************************************************************
                        IMPORTS
************************************************************ */
"use client";

import { useState, useEffect } from "react";
import { SaveBanner } from "@/components/core/save-banner";
import { EditableElement } from "@/components/core/input";
import { supabase } from "@/lib/supabase";

/* ************************************************************
                        INTERFACES
************************************************************ */
interface TermsOfUseData {
    id: string;
    content: string;
    updated_at: string;
}

/* ************************************************************
                        COMPONENTS
************************************************************ */
export default function TermsOfUseInputs() {
    /* ************************************************************
                            HOOKS
    ************************************************************ */
    const [section1, setSection1] = useState("Information on the Site is of a general nature and is not legal, tax or financial advice.");
    const [section2, setSection2] = useState("You must not use the Site for unlawful purposes or disrupt its operation.");
    const [section3, setSection3] = useState("You are responsible for maintaining the security of your account credentials.");
    const [section4, setSection4] = useState("We own or license all IP in the Site. You may view but not reproduce content without consent.");
    const [section5, setSection5] = useState("We are not responsible for Third-Party websites or tools linked from our Site.");
    const [section6, setSection6] = useState("Our Privacy Policy explains how we collect, use and disclose personal information.");
    const [section7, setSection7] = useState("The Site is provided 'as is'. Liability is excluded to the extent permitted by law.");
    const [section8, setSection8] = useState("We may modify or discontinue the Site at any time without notice.");
    const [section9, setSection9] = useState("These Terms of Use are governed by the laws of New South Wales, Australia.");
    const [section10, setSection10] = useState("Brightwork Group Pty Ltd trading as Bright Leasing (ABN 20 688 482 975)\nEmail: hello@brightleasing.com.au\nPhone: 1300 988 938");
    const [section11, setSection11] = useState("You agree to indemnify Bright Leasing and its officers, employees and agents against all claims, losses, damages, costs (including legal costs) arising out of your breach of these Terms or misuse of our services.");
    const [section12, setSection12] = useState("You must not use robots, spiders, data-mining tools or other automated means to access, extract or copy content from our website or services without our prior written consent.");
    const [section13, setSection13] = useState("We may change these Terms, Privacy Policy or Terms of Use at any time by publishing a revised version on our Site with an updated effective date. Continued use after the revision indicates your acceptance. We may also notify you via email or site banner.");
    const [section14, setSection14] = useState("Clauses such as liability, indemnity, confidentiality, intellectual property, and governing law survive termination or expiry of these agreements.");
    const [section15, setSection15] = useState("All notices under these agreements must be in writing, and delivered via email (to your registered email), or by post to the address provided. Notices are effective on receipt (or 3 business days if by post).");
    const [section16, setSection16] = useState("If a provision is invalid or unenforceable, it must be read down or severed, and the rest of the Terms remain in force.");
    const [section17, setSection17] = useState("These Terms, together with any proposal or documentation expressly referring to them, constitute the entire agreement. In the event of conflict, these Terms prevail unless otherwise stated in the proposal.");
    const [section18, setSection18] = useState("If a data breach is likely to result in serious harm, we will notify affected individuals and the OAIC in accordance with the Notifiable Data Breaches scheme under the Privacy Act.");

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

    /* ************************************************************
                            FUNCTIONS
    ************************************************************ */
    useEffect(() => {
        const fetchTermsOfUse = async () => {
            try {
                const { data, error } = await supabase
                    .from('terms_of_use')
                    .select('content')
                    .eq('id', 'terms-of-use-1')
                    .single();

                if (error) {
                    if (error.code === 'PGRST116') {
                        console.log('No terms of use found, using default content');
                    } else if (error.code === '42P01') {
                        console.log('Terms of use table does not exist, using default content');
                    } else {
                        console.error('Error fetching terms of use:', error);
                    }
                } else if (data?.content) {
                    // Parse the HTML content and extract individual sections
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(data.content, 'text/html');
                    const sections = doc.querySelectorAll('div[class*="bg-brand-"]');

                    sections.forEach((section, index) => {
                        const paragraph = section.querySelector('p');
                        if (paragraph && index < 18) {
                            const content = paragraph.textContent || '';
                            const sectionNumber = index + 1;

                            // Update the corresponding state variable
                            switch (sectionNumber) {
                                case 1: setSection1(content); break;
                                case 2: setSection2(content); break;
                                case 3: setSection3(content); break;
                                case 4: setSection4(content); break;
                                case 5: setSection5(content); break;
                                case 6: setSection6(content); break;
                                case 7: setSection7(content); break;
                                case 8: setSection8(content); break;
                                case 9: setSection9(content); break;
                                case 10: setSection10(content); break;
                                case 11: setSection11(content); break;
                                case 12: setSection12(content); break;
                                case 13: setSection13(content); break;
                                case 14: setSection14(content); break;
                                case 15: setSection15(content); break;
                                case 16: setSection16(content); break;
                                case 17: setSection17(content); break;
                                case 18: setSection18(content); break;
                            }
                        }
                    });
                    console.log('Terms of use loaded from database');
                }
            } catch (error) {
                console.error('Unexpected error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTermsOfUse();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        setSaveStatus('idle');

        try {
            // Create HTML content from all sections
            const htmlContent = `
        <div class="space-y-8">
          <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">1. Site Content (General Information Only)</h2>
            <p class="text-brand-black/80">${section1}</p>
          </div>
          <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">2. Your Use of the Site</h2>
            <p class="text-brand-black/80">${section2}</p>
          </div>
          <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">3. Accounts & Security</h2>
            <p class="text-brand-black/80">${section3}</p>
          </div>
          <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">4. Intellectual Property</h2>
            <p class="text-brand-black/80">${section4}</p>
          </div>
          <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">5. Third-Party Links & Tools</h2>
            <p class="text-brand-black/80">${section5}</p>
          </div>
          <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">6. Privacy</h2>
            <p class="text-brand-black/80">${section6}</p>
          </div>
          <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">7. Disclaimers & Liability</h2>
            <p class="text-brand-black/80">${section7}</p>
          </div>
          <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">8. Changes to the Site</h2>
            <p class="text-brand-black/80">${section8}</p>
          </div>
          <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">9. Governing Law</h2>
            <p class="text-brand-black/80">${section9}</p>
          </div>
          <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">10. Contact</h2>
            <p class="text-brand-black/80">${section10.replace(/\n/g, '<br />')}</p>
          </div>
          <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">11. Indemnity</h2>
            <p class="text-brand-black/80">${section11}</p>
          </div>
          <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">12. Prohibited Conduct</h2>
            <p class="text-brand-black/80">${section12}</p>
          </div>
          <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">13. Variation of Terms</h2>
            <p class="text-brand-black/80">${section13}</p>
          </div>
          <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">14. Survival Clause</h2>
            <p class="text-brand-black/80">${section14}</p>
          </div>
          <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">15. Notices</h2>
            <p class="text-brand-black/80">${section15}</p>
          </div>
          <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">16. Severability</h2>
            <p class="text-brand-black/80">${section16}</p>
          </div>
          <div class="bg-brand-yellow/10 border border-brand-yellow/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">17. Entire Agreement</h2>
            <p class="text-brand-black/80">${section17}</p>
          </div>
          <div class="bg-brand-teal/10 border border-brand-teal/20 rounded-2xl p-8">
            <h2 class="text-2xl font-bold text-brand-black mb-4">18. Data Breach Notification</h2>
            <p class="text-brand-black/80">${section18}</p>
          </div>
        </div>
      `;

            const { error } = await supabase
                .from('terms_of_use')
                .upsert({
                    id: 'terms-of-use-1',
                    content: htmlContent,
                    updated_at: new Date().toISOString()
                });

            if (error) {
                if (error.code === '42P01') {
                    console.error('Terms of use table does not exist. Please run the database migration first.');
                    setSaveStatus('error');
                } else {
                    console.error('Error saving terms of use:', error);
                    setSaveStatus('error');
                }
            } else {
                setSaveStatus('success');
                setTimeout(() => setSaveStatus('idle'), 3000);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            setSaveStatus('error');
        } finally {
            setIsSaving(false);
        }
    };

    /* ************************************************************
                            RENDER
    ************************************************************ */
    return (
        <div>
            <SaveBanner
                pageTitle="Terms of Use"
                onSave={handleSave}
                isSaving={isSaving}
                saveStatus={saveStatus}
            />

            <div className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    {/* ***************************************************************
              SECTION 1: SITE CONTENT
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 1 - Site Content (General Information Only)</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection1}
                                    defaultValue={section1}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    General information disclaimer
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 2: YOUR USE OF THE SITE
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 2 - Your Use of the Site</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection2}
                                    defaultValue={section2}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    User responsibilities and restrictions
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 3: ACCOUNTS & SECURITY
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 3 - Accounts & Security</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection3}
                                    defaultValue={section3}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Account security responsibilities
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 4: INTELLECTUAL PROPERTY
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 4 - Intellectual Property</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection4}
                                    defaultValue={section4}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    IP ownership and usage rights
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 5: THIRD-PARTY LINKS & TOOLS
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 5 - Third-Party Links & Tools</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection5}
                                    defaultValue={section5}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Third-party website disclaimers
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 6: PRIVACY
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 6 - Privacy</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection6}
                                    defaultValue={section6}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Privacy policy reference
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 7: DISCLAIMERS & LIABILITY
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 7 - Disclaimers & Liability</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection7}
                                    defaultValue={section7}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Liability limitations and disclaimers
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 8: CHANGES TO THE SITE
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 8 - Changes to the Site</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection8}
                                    defaultValue={section8}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Site modification rights
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 9: GOVERNING LAW
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 9 - Governing Law</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection9}
                                    defaultValue={section9}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Applicable law and jurisdiction
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 10: CONTACT
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 10 - Contact</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Contact Information
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection10}
                                    defaultValue={section10}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    How to contact us about terms of use
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 11: INDEMNITY
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 11 - Indemnity</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection11}
                                    defaultValue={section11}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Indemnity clause for terms of use
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 12: PROHIBITED CONDUCT
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 12 - Prohibited Conduct</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection12}
                                    defaultValue={section12}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Prohibited uses of our website
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 13: VARIATION OF TERMS
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 13 - Variation of Terms</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection13}
                                    defaultValue={section13}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    How we can change our terms
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 14: SURVIVAL CLAUSE
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 14 - Survival Clause</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection14}
                                    defaultValue={section14}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Which clauses survive termination
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 15: NOTICES
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 15 - Notices</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection15}
                                    defaultValue={section15}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    How we send notices to you
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 16: SEVERABILITY
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 16 - Severability</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection16}
                                    defaultValue={section16}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    What happens if part of the terms is invalid
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 17: ENTIRE AGREEMENT
          ****************************************************************/}
                    <section className="bg-brand-yellow/10 border border-brand-yellow/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 17 - Entire Agreement</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection17}
                                    defaultValue={section17}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    This agreement constitutes the entire agreement
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ***************************************************************
              SECTION 18: DATA BREACH NOTIFICATION
          ****************************************************************/}
                    <section className="bg-brand-teal/10 border border-brand-teal/20 p-8 rounded-2xl mb-12">
                        <h2 className="text-xl text-brand-black font-bold mb-4">Section 18 - Data Breach Notification</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-brand-black text-sm font-medium mb-2">
                                    Section Content
                                </label>
                                <EditableElement
                                    as="textarea"
                                    className="w-full p-3 bg-brand-black text-white rounded-lg border border-gray-700 focus:border-white transition-colors h-32"
                                    onTextChange={setSection18}
                                    defaultValue={section18}
                                />
                                <p className="text-gray-400 text-xs mt-1">
                                    Our data breach notification obligations
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

/* ************************************************************
                        EXPORTS
************************************************************ */
