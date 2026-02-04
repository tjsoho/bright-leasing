"use client";

import { EmployersEmployeesPageProps } from "@/app/(employer-employees)/_config";
import { AdditionalFAQ } from "@/app/_config";
import { SaveBanner } from "../core/save-banner";
import usePageDataManager from "@/utils/hooks/usePageDataManager";
import AdminFormSection from "./AdminFormSection";
import AdminImageInput from "./AdminImageInput";
import AdminTextInput from "./AdminTextInput";
import AdminTileInput from "./AdminTileInput";
import { EditableElement } from "../core/input";
import EditableImage from "../core/editable-image";
import { DeepKeys } from "@/types/deep-object";
import { useEffect } from "react";

interface Props {
  data: EmployersEmployeesPageProps;
}

export default function EmployeesEmployersInput({ data }: Props) {
  const { isSaving, getData, handleChange, handleSave } =
    usePageDataManager(data);

  // Initialize dynamic FAQs from static FAQs if dynamic array is empty (only on mount)
  useEffect(() => {
    const currentFaqs = getData<AdditionalFAQ[]>("content.additionalSection8Faqs") || [];
    if (currentFaqs.length === 0) {
      // Migrate static FAQs to dynamic array
      const staticFaqs: AdditionalFAQ[] = [];
      for (let i = 1; i <= 4; i++) {
        const question = getData<string>(`content.section8faq${i}question` as DeepKeys<EmployersEmployeesPageProps>);
        const answer = getData<string>(`content.section8faq${i}answer` as DeepKeys<EmployersEmployeesPageProps>);
        if (question || answer) {
          staticFaqs.push({
            id: `section8-faq-${i}-migrated`,
            question: question || '',
            questionBold: getData<boolean>(`content.section8faq${i}questionBold` as DeepKeys<EmployersEmployeesPageProps>) || false,
            answer: answer || '',
            answerBold: getData<boolean>(`content.section8faq${i}answerBold` as DeepKeys<EmployersEmployeesPageProps>) || false,
          });
        }
      }
      if (staticFaqs.length > 0) {
        handleChange("content.additionalSection8Faqs", staticFaqs);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <SaveBanner
        pageTitle={data.slug === "employees" ? "Employees Page" : "Employers Page"}
        onSave={handleSave}
        isSaving={isSaving}
      />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <AdminFormSection title={data.slug === "employers" ? (getData("content.adminSection1TitleEmployers") ?? "Section 1 - Hero") : (getData("content.adminSection1TitleEmployees") ?? "Section 1 - Hero")}>
            <div className="mb-6 pb-6 border-b border-brand-yellow/30">
              <label className="block text-brand-black text-sm font-medium mb-2">
                Section Title
              </label>
              <EditableElement
                as="textarea"
                className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
                onTextChange={(value) =>
                  handleChange(
                    data.slug === "employers"
                      ? "content.adminSection1TitleEmployers"
                      : "content.adminSection1TitleEmployees",
                    value
                  )
                }
                defaultValue={
                  data.slug === "employers"
                    ? (getData("content.adminSection1TitleEmployers") ?? "Section 1 - Hero")
                    : (getData("content.adminSection1TitleEmployees") ?? "Section 1 - Hero")
                }
              />
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <AdminTextInput
                  label="Title"
                  value={getData("content.heroTitle") ?? ""}
                  bold={getData("content.heroTitleBold") ?? false}
                  onChange={(value) => handleChange("content.heroTitle", value)}
                  onBoldChange={(value) =>
                    handleChange("content.heroTitleBold", value)
                  }
                />
                <AdminTextInput
                  label="Paragraph"
                  value={getData("content.heroParagraph") ?? ""}
                  bold={getData("content.heroParagraphBold") ?? false}
                  onChange={(value) =>
                    handleChange("content.heroParagraph", value)
                  }
                  onBoldChange={(value) =>
                    handleChange("content.heroParagraphBold", value)
                  }
                />
                <AdminTextInput
                  label="Button Text"
                  value={getData("content.heroButtonText") ?? ""}
                  onChange={(value) =>
                    handleChange("content.heroButtonText", value)
                  }
                />
                <AdminTextInput
                  label="Button Path"
                  value={getData("content.heroButtonPath") ?? "/contact"}
                  onChange={(value) =>
                    handleChange("content.heroButtonPath", value)
                  }
                />
              </div>

              <AdminImageInput
                label="Hero Image"
                value={getData("content.heroImage") ?? ""}
                onChange={(value) => handleChange("content.heroImage", value)}
              />
            </div>
          </AdminFormSection>

          {/* Employees Only Section 2 */}
          {data.slug === "employees" && (
            <AdminFormSection title={getData("content.adminSection2TitleEmployees") ?? "Section 2 Benefits (6 Coloured Boxes)"}>
              <div className="mb-6 pb-6 border-b border-brand-yellow/30">
                <label className="block text-brand-black text-sm font-medium mb-2">
                  Section Title
                </label>
                <EditableElement
                  as="textarea"
                  className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
                  onTextChange={(value) =>
                    handleChange("content.adminSection2TitleEmployees", value)
                  }
                  defaultValue={getData("content.adminSection2TitleEmployees") ?? "Section 2 Benefits (6 Coloured Boxes)"}
                />
              </div>
              <div className="space-y-6">
                <AdminTextInput
                  label="Title"
                  value={getData("content.employeesSection2title") ?? ""}
                  bold={getData("content.employeesSection2titleBold") ?? false}
                  onChange={(value) =>
                    handleChange("content.employeesSection2title", value)
                  }
                  onBoldChange={(value) =>
                    handleChange("content.employeesSection2titleBold", value)
                  }
                />
                <AdminTextInput
                  label="Subheading"
                  value={getData("content.employeesSection2subheading") ?? ""}
                  bold={getData("content.employeesSection2subheadingBold") ?? false}
                  onChange={(value) =>
                    handleChange("content.employeesSection2subheading", value)
                  }
                  onBoldChange={(value) =>
                    handleChange("content.employeesSection2subheadingBold", value)
                  }
                />

                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-brand-black p-3 rounded-lg border border-gray-700">
                    <h4 className="text-white font-medium mb-3">Box {index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white text-xs mb-1">Title</label>
                        <EditableElement
                          as="textarea"
                          className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
                          onTextChange={(value) =>
                            handleChange(
                              `content.employeesSection2box${index + 1}title` as DeepKeys<EmployersEmployeesPageProps>,
                              value,
                            )
                          }
                          defaultValue={
                            getData(
                              `content.employeesSection2box${index + 1}title` as DeepKeys<EmployersEmployeesPageProps>,
                            ) ?? ""
                          }
                        />
                        <div className="mt-1">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={
                                getData(
                                  `content.employeesSection2box${index + 1}titleBold` as DeepKeys<EmployersEmployeesPageProps>,
                                ) ?? false
                              }
                              onChange={(e) =>
                                handleChange(
                                  `content.employeesSection2box${index + 1}titleBold` as DeepKeys<EmployersEmployeesPageProps>,
                                  e.target.checked,
                                )
                              }
                              className="w-3 h-3 text-brand-white border-brand-black focus:ring-brand-yellow focus:ring-1"
                            />
                            <span className="text-white text-xs">Bold</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block text-white text-xs mb-1">Content</label>
                        <EditableElement
                          as="textarea"
                          className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm h-16"
                          onTextChange={(value) =>
                            handleChange(
                              `content.employeesSection2box${index + 1}content` as DeepKeys<EmployersEmployeesPageProps>,
                              value,
                            )
                          }
                          defaultValue={
                            getData(
                              `content.employeesSection2box${index + 1}content` as DeepKeys<EmployersEmployeesPageProps>,
                            ) ?? ""
                          }
                        />
                        <div className="mt-1">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={
                                getData(
                                  `content.employeesSection2box${index + 1}contentBold` as DeepKeys<EmployersEmployeesPageProps>,
                                ) ?? false
                              }
                              onChange={(e) =>
                                handleChange(
                                  `content.employeesSection2box${index + 1}contentBold` as DeepKeys<EmployersEmployeesPageProps>,
                                  e.target.checked,
                                )
                              }
                              className="w-3 h-3 text-brand-white border-brand-black focus:ring-brand-yellow focus:ring-1"
                            />
                            <span className="text-white text-xs">Bold</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white text-xs mb-1">Icon</label>
                        <div className="bg-gray-400 rounded-lg p-1 inline-block">
                          <EditableImage
                            src={
                              getData(
                                `content.employeesSection2box${index + 1}icon` as DeepKeys<EmployersEmployeesPageProps>,
                              ) ?? ""
                            }
                            alt={`Box ${index + 1} Icon`}
                            width={64}
                            height={64}
                            onImageChange={(value) =>
                              handleChange(
                                `content.employeesSection2box${index + 1}icon` as DeepKeys<EmployersEmployeesPageProps>,
                                value,
                              )
                            }
                            className="w-12 h-12 rounded-lg object-contain border-2 p-1 border-brand-yellow"
                            usage={`employees-section2-box${index + 1}-icon`}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-white text-xs mb-1">Background Color</label>
                        <select
                          value={
                            getData(
                              `content.employeesSection2box${index + 1}bgColor` as DeepKeys<EmployersEmployeesPageProps>,
                            ) ?? "white"
                          }
                          onChange={(e) =>
                            handleChange(
                              `content.employeesSection2box${index + 1}bgColor` as DeepKeys<EmployersEmployeesPageProps>,
                              e.target.value,
                            )
                          }
                          className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
                        >
                          <option value="white">White</option>
                          <option value="yellow">Yellow</option>
                          <option value="teal">Teal</option>
                          <option value="grey">Grey</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AdminFormSection>
          )}

          {/* Section 2 - Company Values (Employers Only) */}
          {data.slug === "employers" && (
            <AdminFormSection title={getData("content.adminSection2TitleEmployers") ?? "Section 2 - Why It Makes Sense"}>
              <div className="mb-6 pb-6 border-b border-brand-yellow/30">
                <label className="block text-brand-black text-sm font-medium mb-2">
                  Section Title
                </label>
                <EditableElement
                  as="textarea"
                  className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
                  onTextChange={(value) =>
                    handleChange("content.adminSection2TitleEmployers", value)
                  }
                  defaultValue={getData("content.adminSection2TitleEmployers") ?? "Section 2 - Why It Makes Sense"}
                />
              </div>
              <div className="space-y-6">
                <AdminTextInput
                  label="Title"
                  value={getData("content.section2title") ?? ""}
                  bold={getData("content.section2titleBold") ?? false}
                  onChange={(value) =>
                    handleChange("content.section2title", value)
                  }
                  onBoldChange={(value) =>
                    handleChange("content.section2titleBold", value)
                  }
                />

                <AdminTextInput
                  label="Paragraph"
                  value={getData("content.section2paragraph") ?? ""}
                  bold={getData("content.section2paragraphBold") ?? false}
                  onChange={(value) =>
                    handleChange("content.section2paragraph", value)
                  }
                  onBoldChange={(value) =>
                    handleChange("content.section2paragraphBold", value)
                  }
                />

                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="space-y-4">
                    <AdminTileInput
                      label={`Tile ${index + 1}`}
                      title={
                        getData(
                          `content.section2tile${index + 1}title` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? ""
                      }
                      titleBold={
                        getData(
                          `content.section2tile${index + 1}titleBold` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? false
                      }
                      description={
                        getData(
                          `content.section2tile${index + 1}description` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? ""
                      }
                      descriptionBold={
                        getData(
                          `content.section2tile${index + 1}descriptionBold` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? false
                      }
                      image={
                        getData(
                          `content.section2tile${index + 1}icon` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? ""
                      }
                      onTitleChange={(value) =>
                        handleChange(
                          `content.section2tile${index + 1}title` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      onTitleBoldChange={(value) =>
                        handleChange(
                          `content.section2tile${index + 1}titleBold` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      onDescriptionChange={(value) =>
                        handleChange(
                          `content.section2tile${index + 1}description` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      onDescriptionBoldChange={(value) =>
                        handleChange(
                          `content.section2tile${index + 1}descriptionBold` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      onImageChange={(value) =>
                        handleChange(
                          `content.section2tile${index + 1}icon` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                    />
                    <div className="bg-brand-black p-3 rounded-lg border border-gray-700">
                      <label className="block text-white text-xs mb-2">
                        Background Color
                      </label>
                      <select
                        value={
                          getData(
                            `content.section2tile${index + 1}bgColor` as DeepKeys<EmployersEmployeesPageProps>,
                          ) ?? "white"
                        }
                        onChange={(e) =>
                          handleChange(
                            `content.section2tile${index + 1}bgColor` as DeepKeys<EmployersEmployeesPageProps>,
                            e.target.value,
                          )
                        }
                        className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
                      >
                        <option value="white">White</option>
                        <option value="grey">Grey</option>
                        <option value="teal">Teal</option>
                        <option value="yellow">Yellow</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </AdminFormSection>
          )}

          {/* Section 3 - Tip Banner (Employers Only - appears as Section 3) */}
          {data.slug === "employers" && (
            <AdminFormSection title={getData("content.adminSection3TitleEmployers") ?? "Section 3 - Tip Banner"}>
              <div className="mb-6 pb-6 border-b border-brand-yellow/30">
                <label className="block text-brand-black text-sm font-medium mb-2">
                  Section Title
                </label>
                <EditableElement
                  as="textarea"
                  className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
                  onTextChange={(value) =>
                    handleChange("content.adminSection3TitleEmployers", value)
                  }
                  defaultValue={getData("content.adminSection3TitleEmployers") ?? "Section 3 - Tip Banner"}
                />
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-brand-black text-sm font-medium mb-2">
                    Icon
                  </label>
                  <div className="bg-gray-400 rounded-lg p-1 inline-block">
                    <EditableImage
                      src={getData("content.section3icon") ?? ""}
                      alt="Section 3 Icon"
                      width={64}
                      height={64}
                      onImageChange={(value) =>
                        handleChange("content.section3icon", value)
                      }
                      className="w-12 h-12 rounded-lg object-contain border-2 p-1 border-brand-yellow"
                      usage="section3-icon"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <AdminTextInput
                    label="Title"
                    value={getData("content.section3title") ?? ""}
                    bold={getData("content.section3titleBold") ?? false}
                    onChange={(value) =>
                      handleChange("content.section3title", value)
                    }
                    onBoldChange={(value) =>
                      handleChange("content.section3titleBold", value)
                    }
                  />
                  <AdminTextInput
                    label="Paragraph"
                    value={getData("content.section3paragraph") ?? ""}
                    bold={getData("content.section3paragraphBold") ?? false}
                    onChange={(value) =>
                      handleChange("content.section3paragraph", value)
                    }
                    onBoldChange={(value) =>
                      handleChange("content.section3paragraphBold", value)
                    }
                  />
                </div>
              </div>
            </AdminFormSection>
          )}

          {/* Employees Only Section 5 */}
          {data.slug === "employees" && (
            <AdminFormSection title={getData("content.adminSection5TitleEmployees") ?? "Section 3 - Check Boxes (8 Cards)"}>
              <div className="mb-6 pb-6 border-b border-brand-yellow/30">
                <label className="block text-brand-black text-sm font-medium mb-2">
                  Section Title
                </label>
                <EditableElement
                  as="textarea"
                  className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
                  onTextChange={(value) =>
                    handleChange("content.adminSection5TitleEmployees", value)
                  }
                  defaultValue={getData("content.adminSection5TitleEmployees") ?? "Section 3 - Check Boxes (8 Cards)"}
                />
              </div>
              <div className="space-y-6">
                <AdminTextInput
                  label="Title"
                  value={getData("content.employeesSection5title") ?? ""}
                  bold={getData("content.employeesSection5titleBold") ?? false}
                  onChange={(value) =>
                    handleChange("content.employeesSection5title", value)
                  }
                  onBoldChange={(value) =>
                    handleChange("content.employeesSection5titleBold", value)
                  }
                />

                <AdminTextInput
                  label="Paragraph"
                  value={getData("content.employeesSection5paragraph") ?? ""}
                  bold={getData("content.employeesSection5paragraphBold") ?? false}
                  onChange={(value) =>
                    handleChange("content.employeesSection5paragraph", value)
                  }
                  onBoldChange={(value) =>
                    handleChange("content.employeesSection5paragraphBold", value)
                  }
                />

                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="bg-brand-black p-3 rounded-lg border border-gray-700">
                    <h4 className="text-white font-medium mb-4">Tile {index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white text-xs mb-1">Title</label>
                        <EditableElement
                          as="textarea"
                          className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
                          onTextChange={(value) =>
                            handleChange(
                              `content.employeesSection5tiles.${index}.title` as DeepKeys<EmployersEmployeesPageProps>,
                              value,
                            )
                          }
                          defaultValue={
                            getData(
                              `content.employeesSection5tiles.${index}.title` as DeepKeys<EmployersEmployeesPageProps>,
                            ) ?? ""
                          }
                        />
                        <div className="mt-1">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={
                                getData(
                                  `content.employeesSection5tiles.${index}.titleBold` as DeepKeys<EmployersEmployeesPageProps>,
                                ) ?? false
                              }
                              onChange={(e) =>
                                handleChange(
                                  `content.employeesSection5tiles.${index}.titleBold` as DeepKeys<EmployersEmployeesPageProps>,
                                  e.target.checked,
                                )
                              }
                              className="w-3 h-3 text-brand-white border-brand-black focus:ring-brand-yellow focus:ring-1"
                            />
                            <span className="text-white text-xs">Bold</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block text-white text-xs mb-1">Description</label>
                        <EditableElement
                          as="textarea"
                          className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm h-16"
                          onTextChange={(value) =>
                            handleChange(
                              `content.employeesSection5tiles.${index}.description` as DeepKeys<EmployersEmployeesPageProps>,
                              value,
                            )
                          }
                          defaultValue={
                            getData(
                              `content.employeesSection5tiles.${index}.description` as DeepKeys<EmployersEmployeesPageProps>,
                            ) ?? ""
                          }
                        />
                        <div className="mt-1">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={
                                getData(
                                  `content.employeesSection5tiles.${index}.descriptionBold` as DeepKeys<EmployersEmployeesPageProps>,
                                ) ?? false
                              }
                              onChange={(e) =>
                                handleChange(
                                  `content.employeesSection5tiles.${index}.descriptionBold` as DeepKeys<EmployersEmployeesPageProps>,
                                  e.target.checked,
                                )
                              }
                              className="w-3 h-3 text-brand-white border-brand-black focus:ring-brand-yellow focus:ring-1"
                            />
                            <span className="text-white text-xs">Bold</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white text-xs mb-1">Icon</label>
                        <div className="bg-gray-400 rounded-lg p-1 inline-block">
                          <EditableImage
                            src={
                              getData(
                                `content.employeesSection5tiles.${index}.image` as DeepKeys<EmployersEmployeesPageProps>,
                              ) ?? ""
                            }
                            alt={`Tile ${index + 1} Icon`}
                            width={64}
                            height={64}
                            onImageChange={(value) =>
                              handleChange(
                                `content.employeesSection5tiles.${index}.image` as DeepKeys<EmployersEmployeesPageProps>,
                                value,
                              )
                            }
                            className="w-12 h-12 rounded-lg object-contain border-2 p-1 border-brand-yellow"
                            usage={`employees-section5-tile-${index + 1}-icon`}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-white text-xs mb-2">
                          Background Color
                        </label>
                        <select
                          value={
                            getData(
                              `content.employeesSection5tile${index + 1}bgColor` as DeepKeys<EmployersEmployeesPageProps>,
                            ) ?? "white"
                          }
                          onChange={(e) =>
                            handleChange(
                              `content.employeesSection5tile${index + 1}bgColor` as DeepKeys<EmployersEmployeesPageProps>,
                              e.target.value,
                            )
                          }
                          className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
                        >
                          <option value="white">White</option>
                          <option value="grey">Grey</option>
                          <option value="teal">Teal</option>
                          <option value="yellow">Yellow</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AdminFormSection>
          )}

          {/* Section 4 - How it Works */}
          <AdminFormSection title={data.slug === "employers" ? (getData("content.adminSection4TitleEmployers") ?? "Section 4 - Employers Toggle Content") : (getData("content.adminSection4TitleEmployees") ?? "Section 4 - How it Works")}>
            <div className="mb-6 pb-6 border-b border-brand-yellow/30">
              <label className="block text-brand-black text-sm font-medium mb-2">
                Section Title
              </label>
              <EditableElement
                as="textarea"
                className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
                onTextChange={(value) =>
                  handleChange(
                    data.slug === "employers"
                      ? "content.adminSection4TitleEmployers"
                      : "content.adminSection4TitleEmployees",
                    value
                  )
                }
                defaultValue={
                  data.slug === "employers"
                    ? (getData("content.adminSection4TitleEmployers") ?? "Section 4 - Employers Toggle Content")
                    : (getData("content.adminSection4TitleEmployees") ?? "Section 4 - How it Works")
                }
              />
            </div>
            <div className="space-y-6">
              <AdminTextInput
                label="Title"
                value={getData("content.section4title") ?? ""}
                bold={getData("content.section4titleBold") ?? false}
                onChange={(value) =>
                  handleChange("content.section4title", value)
                }
                onBoldChange={(value) =>
                  handleChange("content.section4titleBold", value)
                }
              />

              <AdminTextInput
                label="Paragraph"
                value={getData("content.section4paragraph") ?? ""}
                bold={getData("content.section4paragraphBold") ?? false}
                onChange={(value) =>
                  handleChange("content.section4paragraph", value)
                }
                onBoldChange={(value) =>
                  handleChange("content.section4paragraphBold", value)
                }
              />

              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-brand-black p-3 rounded-lg border border-gray-700">
                  <h4 className="text-white font-medium mb-4">Step {index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <AdminTextInput
                        label="Title"
                        value={
                          getData(
                            `content.section4step${index + 1}title` as DeepKeys<EmployersEmployeesPageProps>,
                          ) ?? ""
                        }
                        bold={
                          getData(
                            `content.section4step${index + 1}titleBold` as DeepKeys<EmployersEmployeesPageProps>,
                          ) ?? false
                        }
                        onChange={(value) =>
                          handleChange(
                            `content.section4step${index + 1}title` as DeepKeys<EmployersEmployeesPageProps>,
                            value,
                          )
                        }
                        onBoldChange={(value) =>
                          handleChange(
                            `content.section4step${index + 1}titleBold` as DeepKeys<EmployersEmployeesPageProps>,
                            value,
                          )
                        }
                      />
                    </div>
                    <div>
                      <AdminTextInput
                        label="Description"
                        value={
                          getData(
                            `content.section4step${index + 1}description` as DeepKeys<EmployersEmployeesPageProps>,
                          ) ?? ""
                        }
                        bold={
                          getData(
                            `content.section4step${index + 1}descriptionBold` as DeepKeys<EmployersEmployeesPageProps>,
                          ) ?? false
                        }
                        onChange={(value) =>
                          handleChange(
                            `content.section4step${index + 1}description` as DeepKeys<EmployersEmployeesPageProps>,
                            value,
                          )
                        }
                        onBoldChange={(value) =>
                          handleChange(
                            `content.section4step${index + 1}descriptionBold` as DeepKeys<EmployersEmployeesPageProps>,
                            value,
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-white text-xs mb-1">Icon</label>
                    <div className="bg-gray-400 rounded-lg p-1 inline-block">
                      <EditableImage
                        src={
                          getData(
                            `content.section4step${index + 1}icon` as DeepKeys<EmployersEmployeesPageProps>,
                          ) ?? ""
                        }
                        alt={`Step ${index + 1} Icon`}
                        width={64}
                        height={64}
                        onImageChange={(value) =>
                          handleChange(
                            `content.section4step${index + 1}icon` as DeepKeys<EmployersEmployeesPageProps>,
                            value,
                          )
                        }
                        className="w-12 h-12 rounded-lg object-contain border-2 p-1 border-brand-yellow"
                        usage={`section4-step-${index + 1}-icon`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AdminFormSection>

          {/* Section 4 - Employees Content (Employers Page Only) */}
          {data.slug === "employers" && (
            <AdminFormSection title={getData("content.adminSection4TitleEmployers") ?? "Section 4 - Employees Toggle Content"}>
              <div className="mb-6 pb-6 border-b border-brand-yellow/30">
                <label className="block text-brand-black text-sm font-medium mb-2">
                  Section Title
                </label>
                <EditableElement
                  as="textarea"
                  className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
                  onTextChange={(value) =>
                    handleChange("content.adminSection4TitleEmployers", value)
                  }
                  defaultValue={getData("content.adminSection4TitleEmployers") ?? "Section 4 - Employees Toggle Content"}
                />
              </div>
              <div className="space-y-6">
                <AdminTextInput
                  label="Employees Paragraph"
                  value={getData("content.section4employeesParagraph") ?? ""}
                  bold={getData("content.section4employeesParagraphBold") ?? false}
                  onChange={(value) =>
                    handleChange("content.section4employeesParagraph", value)
                  }
                  onBoldChange={(value) =>
                    handleChange("content.section4employeesParagraphBold", value)
                  }
                />

                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="bg-brand-teal/10 border border-brand-teal/20 p-3 rounded-lg">
                    <h4 className="text-brand-black font-medium mb-4">Employees Step {index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <AdminTextInput
                          label="Title"
                          value={
                            getData(
                              `content.section4employeesStep${index + 1}title` as DeepKeys<EmployersEmployeesPageProps>,
                            ) ?? ""
                          }
                          bold={
                            getData(
                              `content.section4employeesStep${index + 1}titleBold` as DeepKeys<EmployersEmployeesPageProps>,
                            ) ?? false
                          }
                          onChange={(value) =>
                            handleChange(
                              `content.section4employeesStep${index + 1}title` as DeepKeys<EmployersEmployeesPageProps>,
                              value,
                            )
                          }
                          onBoldChange={(value) =>
                            handleChange(
                              `content.section4employeesStep${index + 1}titleBold` as DeepKeys<EmployersEmployeesPageProps>,
                              value,
                            )
                          }
                        />
                      </div>
                      <div>
                        <AdminTextInput
                          label="Description"
                          value={
                            getData(
                              `content.section4employeesStep${index + 1}description` as DeepKeys<EmployersEmployeesPageProps>,
                            ) ?? ""
                          }
                          bold={
                            getData(
                              `content.section4employeesStep${index + 1}descriptionBold` as DeepKeys<EmployersEmployeesPageProps>,
                            ) ?? false
                          }
                          onChange={(value) =>
                            handleChange(
                              `content.section4employeesStep${index + 1}description` as DeepKeys<EmployersEmployeesPageProps>,
                              value,
                            )
                          }
                          onBoldChange={(value) =>
                            handleChange(
                              `content.section4employeesStep${index + 1}descriptionBold` as DeepKeys<EmployersEmployeesPageProps>,
                              value,
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-brand-black text-xs mb-1">Icon</label>
                      <div className="bg-gray-400 rounded-lg p-1 inline-block">
                        <EditableImage
                          src={
                            getData(
                              `content.section4employeesStep${index + 1}icon` as DeepKeys<EmployersEmployeesPageProps>,
                            ) ?? ""
                          }
                          alt={`Employees Step ${index + 1} Icon`}
                          width={64}
                          height={64}
                          onImageChange={(value) =>
                            handleChange(
                              `content.section4employeesStep${index + 1}icon` as DeepKeys<EmployersEmployeesPageProps>,
                              value,
                            )
                          }
                          className="w-12 h-12 rounded-lg object-contain border-2 p-1 border-brand-yellow"
                          usage={`section4-employees-step-${index + 1}-icon`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AdminFormSection>
          )}

          {/* Section 3 - Tip Banner (Employees Only - appears after Section 4 and before Section 6 Comparison) */}
          {data.slug === "employees" && (
            <AdminFormSection title={getData("content.adminSection3TitleEmployees") ?? "Section 6 - Tip Banner"}>
              <div className="mb-6 pb-6 border-b border-brand-yellow/30">
                <label className="block text-brand-black text-sm font-medium mb-2">
                  Section Title
                </label>
                <EditableElement
                  as="textarea"
                  className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
                  onTextChange={(value) =>
                    handleChange("content.adminSection3TitleEmployees", value)
                  }
                  defaultValue={getData("content.adminSection3TitleEmployees") ?? "Section 6 - Tip Banner"}
                />
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-brand-black text-sm font-medium mb-2">
                    Icon
                  </label>
                  <div className="bg-gray-400 rounded-lg p-1 inline-block">
                    <EditableImage
                      src={getData("content.section3icon") ?? ""}
                      alt="Section 3 Icon"
                      width={64}
                      height={64}
                      onImageChange={(value) =>
                        handleChange("content.section3icon", value)
                      }
                      className="w-12 h-12 rounded-lg object-contain border-2 p-1 border-brand-yellow"
                      usage="section3-icon"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <AdminTextInput
                    label="Title"
                    value={getData("content.section3title") ?? ""}
                    bold={getData("content.section3titleBold") ?? false}
                    onChange={(value) =>
                      handleChange("content.section3title", value)
                    }
                    onBoldChange={(value) =>
                      handleChange("content.section3titleBold", value)
                    }
                  />
                  <AdminTextInput
                    label="Paragraph"
                    value={getData("content.section3paragraph") ?? ""}
                    bold={getData("content.section3paragraphBold") ?? false}
                    onChange={(value) =>
                      handleChange("content.section3paragraph", value)
                    }
                    onBoldChange={(value) =>
                      handleChange("content.section3paragraphBold", value)
                    }
                  />
                </div>
              </div>
            </AdminFormSection>
          )}

          {/* Section 7a - Employees Only (Comparison) */}
          {data.slug === "employees" && (
            <AdminFormSection title={getData("content.adminSection6TitleEmployees") ?? "Section 5 - Comparison"}>
              <div className="mb-6 pb-6 border-b border-brand-yellow/30">
                <label className="block text-brand-black text-sm font-medium mb-2">
                  Section Title
                </label>
                <EditableElement
                  as="textarea"
                  className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
                  onTextChange={(value) =>
                    handleChange("content.adminSection6TitleEmployees", value)
                  }
                  defaultValue={getData("content.adminSection6TitleEmployees") ?? "Section 6 - Comparison"}
                />
              </div>
              <div className="space-y-6">
                <AdminTextInput
                  label="Title"
                  value={getData("content.employeesSection7atitle") ?? ""}
                  bold={getData("content.employeesSection7atitleBold") ?? false}
                  onChange={(value) =>
                    handleChange("content.employeesSection7atitle", value)
                  }
                  onBoldChange={(value) =>
                    handleChange("content.employeesSection7atitleBold", value)
                  }
                />
                <AdminTextInput
                  label="Subheading"
                  value={getData("content.employeesSection7asubheading") ?? ""}
                  bold={getData("content.employeesSection7asubheadingBold") ?? false}
                  onChange={(value) =>
                    handleChange("content.employeesSection7asubheading", value)
                  }
                  onBoldChange={(value) =>
                    handleChange("content.employeesSection7asubheadingBold", value)
                  }
                />
                <div className="grid lg:grid-cols-2 gap-6">
                  <AdminImageInput
                    label="Image 1"
                    value={getData("content.employeesSection7aimage1") ?? ""}
                    onChange={(value) =>
                      handleChange("content.employeesSection7aimage1", value)
                    }
                  />
                  <AdminImageInput
                    label="Image 2"
                    value={getData("content.employeesSection7aimage2") ?? ""}
                    onChange={(value) =>
                      handleChange("content.employeesSection7aimage2", value)
                    }
                  />
                </div>
              </div>
            </AdminFormSection>
          )}

          {/* Section 5 - Benefits (Employers Only) */}
          {data.slug === "employers" && (
            <AdminFormSection title={getData("content.adminSection5TitleEmployers") ?? "Section 5 - Why Choose Bright"}>
              <div className="mb-6 pb-6 border-b border-brand-yellow/30">
                <label className="block text-brand-black text-sm font-medium mb-2">
                  Section Title
                </label>
                <EditableElement
                  as="textarea"
                  className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
                  onTextChange={(value) =>
                    handleChange("content.adminSection5TitleEmployers", value)
                  }
                  defaultValue={getData("content.adminSection5TitleEmployers") ?? "Section 5 - Why Choose Bright"}
                />
              </div>
              <div className="space-y-6">
                <AdminTextInput
                  label="Title"
                  value={getData("content.section5title") ?? ""}
                  bold={getData("content.section5titleBold") ?? false}
                  onChange={(value) =>
                    handleChange("content.section5title", value)
                  }
                  onBoldChange={(value) =>
                    handleChange("content.section5titleBold", value)
                  }
                />

                <AdminTextInput
                  label="Paragraph"
                  value={getData("content.section5paragraph") ?? ""}
                  bold={getData("content.section5paragraphBold") ?? false}
                  onChange={(value) =>
                    handleChange("content.section5paragraph", value)
                  }
                  onBoldChange={(value) =>
                    handleChange("content.section5paragraphBold", value)
                  }
                />

                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="bg-brand-black p-3 rounded-lg border border-gray-700">
                    <h4 className="text-white font-medium mb-4">Tile {index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white text-xs mb-1">Title</label>
                        <EditableElement
                          as="textarea"
                          className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
                          onTextChange={(value) =>
                            handleChange(
                              `content.section5tiles.${index}.title` as DeepKeys<EmployersEmployeesPageProps>,
                              value,
                            )
                          }
                          defaultValue={
                            getData(
                              `content.section5tiles.${index}.title` as DeepKeys<EmployersEmployeesPageProps>,
                            ) ?? ""
                          }
                        />
                        <div className="mt-1">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={
                                getData(
                                  `content.section5tiles.${index}.titleBold` as DeepKeys<EmployersEmployeesPageProps>,
                                ) ?? false
                              }
                              onChange={(e) =>
                                handleChange(
                                  `content.section5tiles.${index}.titleBold` as DeepKeys<EmployersEmployeesPageProps>,
                                  e.target.checked,
                                )
                              }
                              className="w-3 h-3 text-brand-white border-brand-black focus:ring-brand-yellow focus:ring-1"
                            />
                            <span className="text-white text-xs">Bold</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block text-white text-xs mb-1">Description</label>
                        <EditableElement
                          as="textarea"
                          className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm h-16"
                          onTextChange={(value) =>
                            handleChange(
                              `content.section5tiles.${index}.description` as DeepKeys<EmployersEmployeesPageProps>,
                              value,
                            )
                          }
                          defaultValue={
                            getData(
                              `content.section5tiles.${index}.description` as DeepKeys<EmployersEmployeesPageProps>,
                            ) ?? ""
                          }
                        />
                        <div className="mt-1">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={
                                getData(
                                  `content.section5tiles.${index}.descriptionBold` as DeepKeys<EmployersEmployeesPageProps>,
                                ) ?? false
                              }
                              onChange={(e) =>
                                handleChange(
                                  `content.section5tiles.${index}.descriptionBold` as DeepKeys<EmployersEmployeesPageProps>,
                                  e.target.checked,
                                )
                              }
                              className="w-3 h-3 text-brand-white border-brand-black focus:ring-brand-yellow focus:ring-1"
                            />
                            <span className="text-white text-xs">Bold</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white text-xs mb-1">Icon</label>
                        <div className="bg-gray-400 rounded-lg p-1 inline-block">
                          <EditableImage
                            src={
                              getData(
                                `content.section5tiles.${index}.image` as DeepKeys<EmployersEmployeesPageProps>,
                              ) ?? ""
                            }
                            alt={`Tile ${index + 1} Icon`}
                            width={64}
                            height={64}
                            onImageChange={(value) =>
                              handleChange(
                                `content.section5tiles.${index}.image` as DeepKeys<EmployersEmployeesPageProps>,
                                value,
                              )
                            }
                            className="w-12 h-12 rounded-lg object-contain border-2 p-1 border-brand-yellow"
                            usage={`section5-tile-${index + 1}-icon`}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-white text-xs mb-2">
                          Background Color
                        </label>
                        <select
                          value={
                            getData(
                              `content.section5tile${index + 1}bgColor` as DeepKeys<EmployersEmployeesPageProps>,
                            ) ?? "white"
                          }
                          onChange={(e) =>
                            handleChange(
                              `content.section5tile${index + 1}bgColor` as DeepKeys<EmployersEmployeesPageProps>,
                              e.target.value,
                            )
                          }
                          className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
                        >
                          <option value="white">White</option>
                          <option value="grey">Grey</option>
                          <option value="teal">Teal</option>
                          <option value="yellow">Yellow</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AdminFormSection>
          )}

          {/* Section 7 - Promotional Banner */}
          <AdminFormSection title={data.slug === "employers" ? (getData("content.adminSection6TitleEmployers") ?? "Section 6 - Promotional Banner") : (getData("content.adminSection7TitleEmployees") ?? "Section 7 - Promotional Banner")}>
            <div className="mb-6 pb-6 border-b border-brand-yellow/30">
              <label className="block text-brand-black text-sm font-medium mb-2">
                Section Title
              </label>
              <EditableElement
                as="textarea"
                className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
                onTextChange={(value) =>
                  handleChange(
                    data.slug === "employers"
                      ? "content.adminSection6TitleEmployers"
                      : "content.adminSection7TitleEmployees",
                    value
                  )
                }
                defaultValue={
                  data.slug === "employers"
                    ? (getData("content.adminSection6TitleEmployers") ?? "Section 6 - Promotional Banner")
                    : (getData("content.adminSection7TitleEmployees") ?? "Section 7 - Promotional Banner")
                }
              />
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <AdminTextInput
                  label="Title"
                  value={getData("content.section7title") ?? ""}
                  bold={getData("content.section7titleBold") ?? false}
                  onChange={(value) =>
                    handleChange("content.section7title", value)
                  }
                  onBoldChange={(value) =>
                    handleChange("content.section7titleBold", value)
                  }
                />
                <AdminTextInput
                  label="Description"
                  value={getData("content.section7description") ?? ""}
                  bold={getData("content.section7descriptionBold") ?? false}
                  onChange={(value) =>
                    handleChange("content.section7description", value)
                  }
                  onBoldChange={(value) =>
                    handleChange("content.section7descriptionBold", value)
                  }
                />
                <AdminTextInput
                  label="Button Text"
                  value={getData("content.section7buttonText") ?? ""}
                  bold={false}
                  onChange={(value) =>
                    handleChange("content.section7buttonText", value)
                  }
                />
                <AdminTextInput
                  label="Button Path"
                  value={getData("content.section7buttonPath") ?? "/contact"}
                  onChange={(value) =>
                    handleChange("content.section7buttonPath", value)
                  }
                />
              </div>

              <AdminImageInput
                label="Image"
                value={getData("content.section7image") ?? ""}
                onChange={(value) =>
                  handleChange("content.section7image", value)
                }
              />
            </div>
          </AdminFormSection>

          {/* Section 9 - How it Works (with Tabs) */}
          <AdminFormSection title={data.slug === "employers" ? (getData("content.adminSection7TitleEmployers") ?? "Section 7 - Testimonials") : (getData("content.adminSection9TitleEmployees") ?? "Section 8 - Testimonials")}>
            <div className="mb-6 pb-6 border-b border-brand-yellow/30">
              <label className="block text-brand-black text-sm font-medium mb-2">
                Section Title
              </label>
              <EditableElement
                as="textarea"
                className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
                onTextChange={(value) =>
                  handleChange(
                    data.slug === "employers"
                      ? "content.adminSection7TitleEmployers"
                      : "content.adminSection9TitleEmployees",
                    value
                  )
                }
                defaultValue={
                  data.slug === "employers"
                    ? (getData("content.adminSection7TitleEmployers") ?? "Section 7 - Testimonials")
                    : (getData("content.adminSection9TitleEmployees") ?? "Section 9 - Testimonials")
                }
              />
            </div>
            <div className="space-y-6">
              <AdminTextInput
                label="Title"
                value={getData("content.section9title") ?? ""}
                bold={getData("content.section9titleBold") ?? false}
                onChange={(value) =>
                  handleChange("content.section9title", value)
                }
                onBoldChange={(value) =>
                  handleChange("content.section9titleBold", value)
                }
              />

              <AdminTextInput
                label="Paragraph"
                value={getData("content.section9paragraph") ?? ""}
                bold={getData("content.section9paragraphBold") ?? false}
                onChange={(value) =>
                  handleChange("content.section9paragraph", value)
                }
                onBoldChange={(value) =>
                  handleChange("content.section9paragraphBold", value)
                }
              />

              {data.slug === "employers" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-brand-black text-sm font-medium mb-2">
                        Tab 1 Icon
                      </label>
                      <div className="bg-gray-400 rounded-lg p-1 inline-block">
                        <EditableImage
                          src={getData("content.section9tabs.tab1Icon") ?? ""}
                          alt="Tab 1 Icon"
                          width={64}
                          height={64}
                          onImageChange={(value) =>
                            handleChange("content.section9tabs.tab1Icon", value)
                          }
                          className="w-12 h-12 rounded-lg object-contain border-2 p-1 border-brand-yellow"
                          usage="section9-tab1-icon"
                        />
                      </div>
                    </div>
                    <AdminTextInput
                      label="Tab 1 Title"
                      value={getData("content.section9tabs.tab1") ?? ""}
                      onChange={(value) =>
                        handleChange("content.section9tabs.tab1", value)
                      }
                    />
                  </div>

                  {Array.from({ length: 5 }).map((_, index) => (
                    <AdminTileInput
                      key={index}
                      label={`Tab 1 - Content ${index + 1}`}
                      title={
                        getData(
                          `content.section9tab1items.${index}.title` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? ""
                      }
                      titleBold={
                        getData(
                          `content.section9tab1items.${index}.titleBold` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? false
                      }
                      description={
                        getData(
                          `content.section9tab1items.${index}.description` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? ""
                      }
                      descriptionBold={
                        getData(
                          `content.section9tab1items.${index}.descriptionBold` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? false
                      }
                      image={
                        getData(
                          `content.section9tab1items.${index}.image` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? ""
                      }
                      onTitleChange={(value) =>
                        handleChange(
                          `content.section9tab1items.${index}.title` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      onTitleBoldChange={(value) =>
                        handleChange(
                          `content.section9tab1items.${index}.titleBold` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      onDescriptionChange={(value) =>
                        handleChange(
                          `content.section9tab1items.${index}.description` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      onDescriptionBoldChange={(value) =>
                        handleChange(
                          `content.section9tab1items.${index}.descriptionBold` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      onImageChange={(value) =>
                        handleChange(
                          `content.section9tab1items.${index}.image` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      hint={
                        index === 1
                          ? "This Content Image will be use as background on center tile"
                          : ""
                      }
                    />
                  ))}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-brand-black text-sm font-medium mb-2">
                        Tab 2 Icon
                      </label>
                      <div className="bg-gray-400 rounded-lg p-1 inline-block">
                        <EditableImage
                          src={getData("content.section9tabs.tab2Icon") ?? ""}
                          alt="Tab 2 Icon"
                          width={64}
                          height={64}
                          onImageChange={(value) =>
                            handleChange("content.section9tabs.tab2Icon", value)
                          }
                          className="w-12 h-12 rounded-lg object-contain border-2 p-1 border-brand-yellow"
                          usage="section9-tab2-icon"
                        />
                      </div>
                    </div>
                    <AdminTextInput
                      label="Tab 2 Title"
                      value={getData("content.section9tabs.tab2") ?? ""}
                      onChange={(value) =>
                        handleChange("content.section9tabs.tab2", value)
                      }
                    />
                  </div>

                  {Array.from({ length: 5 }).map((_, index) => (
                    <AdminTileInput
                      key={index}
                      label={`Tab 2 - Content ${index + 1}`}
                      title={
                        getData(
                          `content.section9tab2items.${index}.title` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? ""
                      }
                      titleBold={
                        getData(
                          `content.section9tab2items.${index}.titleBold` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? false
                      }
                      description={
                        getData(
                          `content.section9tab2items.${index}.description` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? ""
                      }
                      descriptionBold={
                        getData(
                          `content.section9tab2items.${index}.descriptionBold` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? false
                      }
                      image={
                        getData(
                          `content.section9tab2items.${index}.image` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? ""
                      }
                      onTitleChange={(value) =>
                        handleChange(
                          `content.section9tab2items.${index}.title` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      onTitleBoldChange={(value) =>
                        handleChange(
                          `content.section9tab2items.${index}.titleBold` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      onDescriptionChange={(value) =>
                        handleChange(
                          `content.section9tab2items.${index}.description` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      onDescriptionBoldChange={(value) =>
                        handleChange(
                          `content.section9tab2items.${index}.descriptionBold` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      onImageChange={(value) =>
                        handleChange(
                          `content.section9tab2items.${index}.image` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      hint={
                        index === 1
                          ? "This Content Image will be use as background on center tile"
                          : ""
                      }
                    />
                  ))}
                </>
              )}

              {data.slug === "employees" && (
                <>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <AdminTileInput
                      key={index}
                      label={`Content ${index + 1}`}
                      title={
                        getData(
                          `content.section9tab1items.${index}.title` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? ""
                      }
                      titleBold={
                        getData(
                          `content.section9tab1items.${index}.titleBold` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? false
                      }
                      description={
                        getData(
                          `content.section9tab1items.${index}.description` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? ""
                      }
                      descriptionBold={
                        getData(
                          `content.section9tab1items.${index}.descriptionBold` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? false
                      }
                      image={
                        getData(
                          `content.section9tab1items.${index}.image` as DeepKeys<EmployersEmployeesPageProps>,
                        ) ?? ""
                      }
                      onTitleChange={(value) =>
                        handleChange(
                          `content.section9tab1items.${index}.title` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      onTitleBoldChange={(value) =>
                        handleChange(
                          `content.section9tab1items.${index}.titleBold` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      onDescriptionChange={(value) =>
                        handleChange(
                          `content.section9tab1items.${index}.description` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      onDescriptionBoldChange={(value) =>
                        handleChange(
                          `content.section9tab1items.${index}.descriptionBold` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      onImageChange={(value) =>
                        handleChange(
                          `content.section9tab1items.${index}.image` as DeepKeys<EmployersEmployeesPageProps>,
                          value,
                        )
                      }
                      hint={
                        index === 1
                          ? "This Content Image will be use as background on center tile"
                          : ""
                      }
                    />
                  ))}
                </>
              )}
            </div>
          </AdminFormSection>

          {/* Section 8 - FAQ */}
          <AdminFormSection title={data.slug === "employers" ? (getData("content.adminSection8TitleEmployers") ?? "Section 8 - FAQ") : (getData("content.adminSection8TitleEmployees") ?? "Section 9 - FAQ")}>
            <div className="mb-6 pb-6 border-b border-brand-yellow/30">
              <label className="block text-brand-black text-sm font-medium mb-2">
                Section Title
              </label>
              <EditableElement
                as="textarea"
                className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
                onTextChange={(value) =>
                  handleChange(
                    data.slug === "employers"
                      ? "content.adminSection8TitleEmployers"
                      : "content.adminSection8TitleEmployees",
                    value
                  )
                }
                defaultValue={
                  data.slug === "employers"
                    ? (getData("content.adminSection8TitleEmployers") ?? "Section 8 - FAQ")
                    : (getData("content.adminSection8TitleEmployees") ?? "Section 8 - FAQ")
                }
              />
            </div>
            <div className="space-y-6">
              <AdminTextInput
                label="Title"
                value={getData("content.section8title") ?? ""}
                bold={getData("content.section8titleBold") ?? false}
                onChange={(value) =>
                  handleChange("content.section8title", value)
                }
                onBoldChange={(value) =>
                  handleChange("content.section8titleBold", value)
                }
              />

              <AdminImageInput
                label="Section Image"
                value={getData("content.section8image") ?? ""}
                onChange={(value) => handleChange("content.section8image", value)}
              />

              <AdminTextInput
                label="FAQ Link Path"
                value={getData("content.section8faqLinkPath") ?? "/faqs"}
                onChange={(value) =>
                  handleChange("content.section8faqLinkPath", value)
                }
              />

              {/* Dynamic FAQs */}
              {(getData<Array<{ id: string; question: string; questionBold: boolean; answer: string; answerBold: boolean }>>("content.additionalSection8Faqs") || []).map((faq, index) => (
                <div key={faq.id} className="bg-brand-black p-3 rounded-lg border border-gray-700">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-white font-medium">FAQ {index + 1}</h4>
                    <button
                      onClick={() => {
                        const currentFaqs = getData<Array<{ id: string; question: string; questionBold: boolean; answer: string; answerBold: boolean }>>("content.additionalSection8Faqs") || [];
                        handleChange("content.additionalSection8Faqs", currentFaqs.filter(f => f.id !== faq.id));
                      }}
                      className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-white text-xs mb-1">Question</label>
                      <EditableElement
                        as="textarea"
                        className="w-full p-2 bg-white text-brand-black rounded border border-brand-black/20 focus:border-brand-teal transition-colors text-sm"
                        onTextChange={(value) => {
                          const currentFaqs = getData<Array<{ id: string; question: string; questionBold: boolean; answer: string; answerBold: boolean }>>("content.additionalSection8Faqs") || [];
                          const updatedFaqs = currentFaqs.map(f =>
                            f.id === faq.id ? { ...f, question: value } : f
                          );
                          handleChange("content.additionalSection8Faqs", updatedFaqs);
                        }}
                        defaultValue={faq.question}
                      />
                      <div className="mt-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={faq.questionBold}
                            onChange={(e) => {
                              const currentFaqs = getData<Array<{ id: string; question: string; questionBold: boolean; answer: string; answerBold: boolean }>>("content.additionalSection8Faqs") || [];
                              const updatedFaqs = currentFaqs.map(f =>
                                f.id === faq.id ? { ...f, questionBold: e.target.checked } : f
                              );
                              handleChange("content.additionalSection8Faqs", updatedFaqs);
                            }}
                            className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
                          />
                          <span className="text-white text-xs">Bold</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-white text-xs mb-1">Answer</label>
                      <EditableElement
                        as="textarea"
                        className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-white transition-colors text-sm h-24"
                        onTextChange={(value) => {
                          const currentFaqs = getData<Array<{ id: string; question: string; questionBold: boolean; answer: string; answerBold: boolean }>>("content.additionalSection8Faqs") || [];
                          const updatedFaqs = currentFaqs.map(f =>
                            f.id === faq.id ? { ...f, answer: value } : f
                          );
                          handleChange("content.additionalSection8Faqs", updatedFaqs);
                        }}
                        defaultValue={faq.answer}
                      />
                      <div className="mt-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={faq.answerBold}
                            onChange={(e) => {
                              const currentFaqs = getData<Array<{ id: string; question: string; questionBold: boolean; answer: string; answerBold: boolean }>>("content.additionalSection8Faqs") || [];
                              const updatedFaqs = currentFaqs.map(f =>
                                f.id === faq.id ? { ...f, answerBold: e.target.checked } : f
                              );
                              handleChange("content.additionalSection8Faqs", updatedFaqs);
                            }}
                            className="w-3 h-3 text-brand-yellow border-brand-yellow/30 focus:ring-brand-yellow focus:ring-1"
                          />
                          <span className="text-white text-xs">Bold</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add FAQ Button */}
              <div className="mt-4">
                <button
                  onClick={() => {
                    const currentFaqs = getData<Array<{ id: string; question: string; questionBold: boolean; answer: string; answerBold: boolean }>>("content.additionalSection8Faqs") || [];
                    const newFaq = {
                      id: `section8-faq-${Date.now()}`,
                      question: '',
                      questionBold: false,
                      answer: '',
                      answerBold: false
                    };
                    handleChange("content.additionalSection8Faqs", [...currentFaqs, newFaq]);
                  }}
                  className="px-4 py-2 bg-brand-yellow text-brand-black rounded-lg font-medium hover:bg-brand-yellow/80 transition-colors"
                >
                  Add FAQ
                </button>
              </div>
            </div>
          </AdminFormSection>
        </div>
      </div>
    </div>
  );
}
