import React, { Component } from 'react';
import { saveAs } from 'file-saver';
import { Packer, ShadingType } from 'docx';
import {
  AlignmentType,
  Document,
  HeadingLevel,
  Paragraph,
  Table,
  TableCell,
  TableLayoutType,
  TableRow,
  WidthType,
} from 'docx';
import axios from 'axios';
import { Button } from '@mui/material';

axios.defaults.headers.common['token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMxNGI0ZGExLWEzNjQtNDdjNS04YzZhLWM3NGU4ODU5NGFlOCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3MzI3NjgxNSwiZXhwIjoxNzA0ODEyODE1fQ.IEIgNy7Ob09I8RCkw7f-S2IooDtoHHpN3NwTnY_yvuo';

class DocumentCreator {

  timer(time) {
    time /= 1000;
    let hour = time / 3600;
    time %= 3600;
    let min = time / 60;
    time %= 60;
    return `${Math.round(hour)} giờ ${Math.round(min)} phút ${time.toFixed(2)} giây`;
  }

  dater(date) {
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    let hour = date.slice(11, 13);
    let min = date.slice(14, 16);
    let sec = date.slice(17, 19);
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
  }
  detailer(info) {
    const temp = info.submissions.map((submission, index) => {
      return [
        new Paragraph(''),
        new Paragraph({
          text: `${index + 1}. ID: ${submission.id} (${submission.user.username})`,
          heading: HeadingLevel.HEADING_2
        }),
        new Paragraph(''),
        new Table({
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ text: 'Accuracy (%)', heading: HeadingLevel.HEADING_3 })],
                  shading: {
                    fill: '00B0F0',
                    type: ShadingType.CLEAR,
                  },
                }),
                new TableCell({
                  children: [new Paragraph({ text: 'Precision (%)', heading: HeadingLevel.HEADING_3 })],
                  shading: {
                    fill: '00B0F0',
                    type: ShadingType.CLEAR,
                  },
                }),
                new TableCell({
                  children: [new Paragraph({ text: 'Recall (%)', heading: HeadingLevel.HEADING_3 })],
                  shading: {
                    fill: '00B0F0',
                    type: ShadingType.CLEAR,
                  },
                }),
                new TableCell({
                  children: [new Paragraph({ text: 'F1 Score (%)', heading: HeadingLevel.HEADING_3 })],
                  shading: {
                    fill: '00B0F0',
                    type: ShadingType.CLEAR,
                  },
                }),
                new TableCell({
                  children: [new Paragraph({ text: 'Thời gian đánh giá', heading: HeadingLevel.HEADING_3 })],
                  shading: {
                    fill: '00B0F0',
                    type: ShadingType.CLEAR,
                  },
                }),
                new TableCell({
                  children: [new Paragraph({ text: 'Bộ nhớ (KB)', heading: HeadingLevel.HEADING_3 })],
                  shading: {
                    fill: '00B0F0',
                    type: ShadingType.CLEAR,
                  },
                }),
              ],
              tableHeader: true
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ text: `${submission.accuracy.toFixed(3)}`, heading: HeadingLevel.HEADING_4 })],
                }),
                new TableCell({
                  children: [new Paragraph({ text: `${submission.precision.toFixed(3)}`, heading: HeadingLevel.HEADING_4 })],
                }),
                new TableCell({
                  children: [new Paragraph({ text: `${submission.recall.toFixed(3)}`, heading: HeadingLevel.HEADING_4 })],
                }),
                new TableCell({
                  children: [new Paragraph({ text: `${submission.f1score.toFixed(3)}`, heading: HeadingLevel.HEADING_4 })],
                }),
                new TableCell({
                  children: [new Paragraph({ text: `${this.timer(submission.executionTime)} `, heading: HeadingLevel.HEADING_4 })],
                }),
                new TableCell({
                  children: [new Paragraph({ text: `${Math.round(submission.executionMemories)}`, heading: HeadingLevel.HEADING_4 })],
                }),
              ],
            })
          ]
        }),
        new Paragraph(''),
        new Table({
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ text: 'Video ID', heading: HeadingLevel.HEADING_3 })],
                  shading: {
                    fill: '00B0F0',
                    type: ShadingType.CLEAR,
                  },
                }),
                new TableCell({
                  children: [new Paragraph({ text: 'Accuracy (%)', heading: HeadingLevel.HEADING_3 })],
                  shading: {
                    fill: '00B0F0',
                    type: ShadingType.CLEAR,
                  },
                }),
                new TableCell({
                  children: [new Paragraph({ text: 'Precision (%)', heading: HeadingLevel.HEADING_3 })],
                  shading: {
                    fill: '00B0F0',
                    type: ShadingType.CLEAR,
                  },
                }),
                new TableCell({
                  children: [new Paragraph({ text: 'Recall (%)', heading: HeadingLevel.HEADING_3 })],
                  shading: {
                    fill: '00B0F0',
                    type: ShadingType.CLEAR,
                  },
                }),
                new TableCell({
                  children: [new Paragraph({ text: 'F1 Score (%)', heading: HeadingLevel.HEADING_3 })],
                  shading: {
                    fill: '00B0F0',
                    type: ShadingType.CLEAR,
                  },
                }),
                new TableCell({
                  children: [new Paragraph({ text: 'Thời gian đánh giá', heading: HeadingLevel.HEADING_3 })],
                  shading: {
                    fill: '00B0F0',
                    type: ShadingType.CLEAR,
                  },
                }),
                new TableCell({
                  children: [new Paragraph({ text: 'Bộ nhớ (KB)', heading: HeadingLevel.HEADING_3 })],
                  shading: {
                    fill: '00B0F0',
                    type: ShadingType.CLEAR,
                  },
                }),
              ],
              tableHeader: true
            }),
            ...submission.details.map((detail, index) => {
              return new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ text: `${index + 1} `, heading: HeadingLevel.HEADING_4 })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: `${detail.accuracy.toFixed(3)}`, heading: HeadingLevel.HEADING_4 })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: `${detail.precision.toFixed(3)}`, heading: HeadingLevel.HEADING_4 })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: `${detail.recall.toFixed(3)}`, heading: HeadingLevel.HEADING_4 })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: `${detail.f1score.toFixed(3)}`, heading: HeadingLevel.HEADING_4 })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: `${this.timer(detail.executionTime)} `, heading: HeadingLevel.HEADING_4 })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: `${Math.round(detail.executionMemories)}`, heading: HeadingLevel.HEADING_4 })],
                  }),
                ],
              })
            })
          ]
        }),
        new Paragraph('')
      ]
    });
    return temp.flatMap(t => t);
  }

  create(info) {
    console.log(info);
    const document = new Document({
      styles: {
        paragraphStyles: [
          {
            id: "Heading3",
            name: "Heading 3",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 28,
              bold: true,
              color: "000000",
            },
            paragraph: {
              spacing: {
                before: 240,
                after: 120
              },
            },
          },
          {
            id: "Heading1",
            name: "Heading 1",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 36,
              bold: true,
              color: "000000",
            },
            paragraph: {
              spacing: {
                before: 240,
                after: 120
              },
            },
          },
          {
            id: "Heading2",
            name: "Heading 2",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 32,
              bold: true,
              italics: true,
              color: "000000",
            },
            paragraph: {
              spacing: {
                before: 240,
                after: 120
              },
            },
          },
          {
            id: "Heading4",
            name: "Heading 4",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 28,
              bold: false,
              color: "000000",
            },
            paragraph: {
              spacing: {
                before: 240,
                after: 120
              },
            },
          },
        ]
      },
      sections: [
        {
          children: [
            new Paragraph({
              text: 'BÁO CÁO TỔNG HỢP KẾT QUẢ',
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER
            }),
            new Paragraph({
              text: `ĐÁNH GIÁ HIỆU NĂNG VÀ ĐỘ TIN CẬY CỦA SẢN PHẨM, MÔ HÌNH TRÍ TUỆ NHÂN TẠO CHO VẤN ĐỀ ${info.title.toUpperCase()
                }`,
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER
            }),
            new Paragraph(''),
            this.createHeading('A. THÔNG TIN CƠ BẢN VỀ THIẾT BỊ ĐÁNH GIÁ'),
            new Paragraph(''),
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: 'RAM', heading: HeadingLevel.HEADING_3 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                      width: {
                        size: 4535,
                        type: WidthType.DXA,
                      }
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: '8 GB', heading: HeadingLevel.HEADING_4 })],
                      width: {
                        size: 4535,
                        type: WidthType.DXA,
                      }
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: 'CPU', heading: HeadingLevel.HEADING_3 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: '32 nhân', heading: HeadingLevel.HEADING_4 })],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: 'Bộ nhớ', heading: HeadingLevel.HEADING_3 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: '100 GB', heading: HeadingLevel.HEADING_4 })],
                    }),
                  ],
                }),
              ],
            }),
            new Paragraph(''),
            this.createHeading('B. THÔNG TIN CƠ BẢN VỀ VẤN ĐỀ ĐÁNH GIÁ'),
            new Paragraph(''),
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: 'Mô tả', heading: HeadingLevel.HEADING_3 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: `${info.description}`, heading: HeadingLevel.HEADING_4 })],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: 'Đầu vào', heading: HeadingLevel.HEADING_3 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: `${info.inputDescription} `, heading: HeadingLevel.HEADING_4 })],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: 'Đầu ra', heading: HeadingLevel.HEADING_3 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({ text: `${info.outputDescription} `, heading: HeadingLevel.HEADING_4 }),
                        new Table({
                          rows: [
                            new TableRow({
                              children: [
                                new TableCell({
                                  children: [
                                    new Paragraph({ text: 'frame_x', heading: HeadingLevel.HEADING_3 }),
                                  ],
                                  shading: {
                                    fill: '00B0F0',
                                    type: ShadingType.CLEAR,
                                  },
                                }),
                                new TableCell({
                                  children: [
                                    new Paragraph({ text: 'total', heading: HeadingLevel.HEADING_3 }),
                                  ],
                                  shading: {
                                    fill: '00B0F0',
                                    type: ShadingType.CLEAR,
                                  },
                                }),
                                new TableCell({
                                  children: [
                                    new Paragraph({ text: 'bounding_box', heading: HeadingLevel.HEADING_3 }),
                                  ],
                                  shading: {
                                    fill: '00B0F0',
                                    type: ShadingType.CLEAR,
                                  },
                                }),
                              ],
                              tableHeader: true,
                            }),
                            ...info.outputTable.map((row) => {
                              return new TableRow({
                                children: [
                                  new TableCell({
                                    children: [new Paragraph({ text: `${row['frame_x']}`, heading: HeadingLevel.HEADING_4 })]
                                  }),
                                  new TableCell({
                                    children: [new Paragraph({ text: `${row['total']}`, heading: HeadingLevel.HEADING_4 })]
                                  }),
                                  new TableCell({
                                    children: [new Paragraph({ text: `${row['bounding_box']}`, heading: HeadingLevel.HEADING_4 })]
                                  }),
                                ],
                              })
                            })
                          ],
                          alignment: AlignmentType.CENTER
                        })
                      ],
                    }),
                  ],
                }),
              ],
            }),

            new Paragraph(''),
            this.createHeading('C. KẾT QUẢ ĐÁNH GIÁ TỔNG QUAN'),
            new Paragraph(''),
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: 'User', heading: HeadingLevel.HEADING_3 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: 'Accuracy (%)', heading: HeadingLevel.HEADING_3 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: 'Precision (%)', heading: HeadingLevel.HEADING_3 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: 'Recall (%)', heading: HeadingLevel.HEADING_3 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: 'F1 Score (%)', heading: HeadingLevel.HEADING_3 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: 'Thời gian đánh giá', heading: HeadingLevel.HEADING_3 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: 'Bộ nhớ (KB)', heading: HeadingLevel.HEADING_3 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                  ],
                  tableHeader: true
                }),
                ...info.submissions.map((submission, index) => {
                  return new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph({ text: `${submission.user.username} `, heading: HeadingLevel.HEADING_4 })],
                      }),
                      new TableCell({
                        children: [new Paragraph({ text: `${submission.accuracy.toFixed(3)}`, heading: HeadingLevel.HEADING_4 })],
                      }),
                      new TableCell({
                        children: [new Paragraph({ text: `${submission.precision.toFixed(3)}`, heading: HeadingLevel.HEADING_4 })],
                      }),
                      new TableCell({
                        children: [new Paragraph({ text: `${submission.recall.toFixed(3)}`, heading: HeadingLevel.HEADING_4 })],
                      }),
                      new TableCell({
                        children: [new Paragraph({ text: `${submission.f1score.toFixed(3)}`, heading: HeadingLevel.HEADING_4 })],
                      }),
                      new TableCell({
                        children: [new Paragraph({ text: `${this.timer(submission.executionTime)} `, heading: HeadingLevel.HEADING_4 })],
                      }),
                      new TableCell({
                        children: [new Paragraph({ text: `${Math.round(submission.executionMemories)}`, heading: HeadingLevel.HEADING_4 })],
                      }),
                    ],
                  })
                })
              ]
            }),
            new Paragraph(''),
            this.createHeading('D. KẾT QUẢ ĐÁNH GIÁ CHI TIẾT'),
            ...this.detailer(info)
          ],
          width: {
            type: WidthType.XDA,
          },
          tableLayout: TableLayoutType.AUTOFIT
        },
      ],
    });

    return document;
  }

  createHeading(text) {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true,
    });
  }
}

class SummaryReport extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  generate = async () => {

    const documentCreator = new DocumentCreator();
    const doc = documentCreator.create(this.props.info);

    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, 'summary-report.docx');
      console.log('Document created successfully');
    });
  }

  render = () => {
    return (
      <div>
        {/* <p> */}
          <Button onClick={this.generate}>Download summary report</Button>
        {/* </p> */}
      </div>
    );
  }
}

export default SummaryReport;