"use client";

import { EmployersEmployeesPageProps } from "@/app/(employer-employees)/_config";
import { SaveBanner } from "../core/save-banner";
import usePageDataManager from "@/utils/hooks/usePageDataManager";
import AdminFormSection from "./AdminFormSection";
import AdminImageInput from "./AdminImageInput";
import AdminTextInput from "./AdminTextInput";
import AdminTileInput from "./AdminTileInput";
import { EditableElement } from "../core/input";
import EditableImage from "../core/editable-image";
import { DeepKeys } from "@/types/deep-object";

interface Props {
  data: EmployersEmployeesPageProps;
}

export default function EmployeesEmployersInput({ data }: Props) {
  const { isSaving, getData, handleChange, handleSave } =
    usePageDataManager(data);

  return (
    <div>
      <SaveBanner
        pageTitle="Contact Page"
        onSave={handleSave}
        isSaving={isSaving}
      />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <AdminFormSection title="Hero Section">
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
            <AdminFormSection title="Section 2 - Employees Only (6 Colored Boxes)">
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

          {/* Section 2 - Company Values */}
          <AdminFormSection title="Section 2 - Company Values">
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

          {/* Employees Only Section 5 */}
          {data.slug === "employees" && (
            <AdminFormSection title="Section 5 - Employees Only (with Tick Icons - 8 Cards)">
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

          {/* Section 3 - Tip Banner */}
          <AdminFormSection title="Section 3 - Tip Banner">
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

          {/* Section 4 - How it Works */}
          <AdminFormSection title="Section 4 - How it Works">
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

          {/* Section 5 - Benefits (Employers Only) */}
          {data.slug === "employers" && (
            <AdminFormSection title="Section 5 - Benefits">
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
          <AdminFormSection title="Section 7 - Promotional Banner">
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
          <AdminFormSection title="Section 9 - How it Works (with Tabs)">
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
          <AdminFormSection title="Section 8 - FAQ">
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

              {Array.from({ length: 4 }).map((_, index) => (
                <AdminTileInput
                  key={index}
                  label={`FAQ ${index + 1}`}
                  type="faq"
                  title={
                    getData(
                      `content.section8faq${index + 1}question` as DeepKeys<EmployersEmployeesPageProps>,
                    ) ?? ""
                  }
                  titleBold={
                    getData(
                      `content.section8faq${index + 1}questionBold` as DeepKeys<EmployersEmployeesPageProps>,
                    ) ?? false
                  }
                  description={
                    getData(
                      `content.section8faq${index + 1}answer` as DeepKeys<EmployersEmployeesPageProps>,
                    ) ?? ""
                  }
                  descriptionBold={
                    getData(
                      `content.section8faq${index + 1}answerBold` as DeepKeys<EmployersEmployeesPageProps>,
                    ) ?? false
                  }
                  onTitleChange={(value) =>
                    handleChange(
                      `content.section8faq${index + 1}question` as DeepKeys<EmployersEmployeesPageProps>,
                      value,
                    )
                  }
                  onTitleBoldChange={(value) =>
                    handleChange(
                      `content.section8faq${index + 1}questionBold` as DeepKeys<EmployersEmployeesPageProps>,
                      value,
                    )
                  }
                  onDescriptionChange={(value) =>
                    handleChange(
                      `content.section8faq${index + 1}answer` as DeepKeys<EmployersEmployeesPageProps>,
                      value,
                    )
                  }
                  onDescriptionBoldChange={(value) =>
                    handleChange(
                      `content.section8faq${index + 1}answerBold` as DeepKeys<EmployersEmployeesPageProps>,
                      value,
                    )
                  }
                />
              ))}
            </div>
          </AdminFormSection>
        </div>
      </div>
    </div>
  );
}
