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
import { base_URL } from '../../utils/constants';
import { getSubmissionById } from '../../services/submissionApi';
import { Button } from '@mui/material';

// axios.defaults.headers.common['token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMxNGI0ZGExLWEzNjQtNDdjNS04YzZhLWM3NGU4ODU5NGFlOCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3MzI3NjgxNSwiZXhwIjoxNzA0ODEyODE1fQ.IEIgNy7Ob09I8RCkw7f-S2IooDtoHHpN3NwTnY_yvuo';

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

  create(info) {
    console.log(info);
    const document = new Document({
      styles: {
        paragraphStyles: [
          {
            id: "Heading2",
            name: "Heading 2",
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
            id: "Heading3",
            name: "Heading 3",
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
              text: 'BÁO CÁO CHI TIẾT KẾT QUẢ',
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER
            }),
            new Paragraph({
              text: `ĐÁNH GIÁ HIỆU NĂNG VÀ ĐỘ TIN CẬY CỦA SẢN PHẨM, MÔ HÌNH TRÍ TUỆ NHÂN TẠO CHO VẤN ĐỀ ${info.problem.title.toUpperCase()
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
                      children: [new Paragraph({ text: 'RAM', heading: HeadingLevel.HEADING_2 })],
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
                      children: [new Paragraph({ text: '8 GB', heading: HeadingLevel.HEADING_3 })],
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
                      children: [new Paragraph({ text: 'CPU', heading: HeadingLevel.HEADING_2 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: '32 nhân', heading: HeadingLevel.HEADING_3 })],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: 'Bộ nhớ', heading: HeadingLevel.HEADING_2 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: '100 GB', heading: HeadingLevel.HEADING_3 })],
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
                      children: [new Paragraph({ text: 'Mô tả', heading: HeadingLevel.HEADING_2 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: `${info.problem.description}`, heading: HeadingLevel.HEADING_3 })],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: 'Đầu vào', heading: HeadingLevel.HEADING_2 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: `${info.problem.inputDescription} `, heading: HeadingLevel.HEADING_3 })],
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
                        new Paragraph({ text: `${info.problem.outputDescription} `, heading: HeadingLevel.HEADING_3 }),
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
                            ...info.problem.outputTable.map((row) => {
                              return new TableRow({
                                children: [
                                  new TableCell({
                                    children: [new Paragraph({ text: `${row['frame_x']}`, heading: HeadingLevel.HEADING_3 })]
                                  }),
                                  new TableCell({
                                    children: [new Paragraph({ text: `${row['total']}`, heading: HeadingLevel.HEADING_3 })]
                                  }),
                                  new TableCell({
                                    children: [new Paragraph({ text: `${row['bounding_box']}`, heading: HeadingLevel.HEADING_3 })]
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
            this.createHeading('C. TỔNG QUAN VỀ KẾT QUẢ ĐÁNH GIÁ'),
            new Paragraph(''),
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: 'Ngày đánh giá', heading: HeadingLevel.HEADING_2 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: 'Accuracy (%)', heading: HeadingLevel.HEADING_2 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: 'Precision (%)', heading: HeadingLevel.HEADING_2 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: 'Recall (%)', heading: HeadingLevel.HEADING_2 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: 'F1 Score (%)', heading: HeadingLevel.HEADING_2 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: 'Thời gian đánh giá', heading: HeadingLevel.HEADING_2 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: 'Bộ nhớ (KB)', heading: HeadingLevel.HEADING_2 })],
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
                      children: [new Paragraph({ text: `${this.dater(info.createdAt)} `, heading: HeadingLevel.HEADING_3 })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: `${info.accuracy.toFixed(3)}`, heading: HeadingLevel.HEADING_3 })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: `${info.precision.toFixed(3)}`, heading: HeadingLevel.HEADING_3 })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: `${info.recall.toFixed(3)}`, heading: HeadingLevel.HEADING_3 })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: `${info.f1score.toFixed(3)}`, heading: HeadingLevel.HEADING_3 })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: `${this.timer(info.executionTime)} `, heading: HeadingLevel.HEADING_3 })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: `${Math.round(info.executionMemories)}`, heading: HeadingLevel.HEADING_3 })],
                    }),
                  ],
                }),
              ],
            }),
            new Paragraph(''),
            this.createHeading('D. KẾT QUẢ ĐÁNH GIÁ CHI TIẾT'),
            new Paragraph(''),
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ text: 'Video ID', heading: HeadingLevel.HEADING_2 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: 'Accuracy (%)', heading: HeadingLevel.HEADING_2 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: 'Precision (%)', heading: HeadingLevel.HEADING_2 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: 'Recall (%)', heading: HeadingLevel.HEADING_2 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: 'F1 Score (%)', heading: HeadingLevel.HEADING_2 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: 'Thời gian đánh giá', heading: HeadingLevel.HEADING_2 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: 'Bộ nhớ (KB)', heading: HeadingLevel.HEADING_2 })],
                      shading: {
                        fill: '00B0F0',
                        type: ShadingType.CLEAR,
                      },
                    }),
                  ],
                  tableHeader: true
                }),
                ...info.details.map((submission, index) => {
                  return new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph({ text: `${index + 1} `, heading: HeadingLevel.HEADING_3 })],
                      }),
                      new TableCell({
                        children: [new Paragraph({ text: `${submission.accuracy.toFixed(3)}`, heading: HeadingLevel.HEADING_3 })],
                      }),
                      new TableCell({
                        children: [new Paragraph({ text: `${submission.precision.toFixed(3)}`, heading: HeadingLevel.HEADING_3 })],
                      }),
                      new TableCell({
                        children: [new Paragraph({ text: `${submission.recall.toFixed(3)}`, heading: HeadingLevel.HEADING_3 })],
                      }),
                      new TableCell({
                        children: [new Paragraph({ text: `${submission.f1score.toFixed(3)}`, heading: HeadingLevel.HEADING_3 })],
                      }),
                      new TableCell({
                        children: [new Paragraph({ text: `${this.timer(submission.executionTime)} `, heading: HeadingLevel.HEADING_3 })],
                      }),
                      new TableCell({
                        children: [new Paragraph({ text: `${Math.round(submission.executionMemories)}`, heading: HeadingLevel.HEADING_3 })],
                      }),
                    ],
                  })
                })
              ]
            }),
            new Paragraph(''),
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

class Report extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  generate = async () => {
    const documentCreator = new DocumentCreator();
    const id = this.props.id;
    getSubmissionById(id).then((res) => {
      // console.log(res);
      const doc = documentCreator.create(res.data);
  
      Packer.toBlob(doc).then((blob) => {
        console.log(blob);
        saveAs(blob, 'report.docx');
        console.log('Document created successfully');
      });
    })
  }

  render = () => {
    return (
      <div>
        <p>
          <Button size={this.props?.title ? '' : 'small'} onClick={this.generate}>{this.props?.title ? this.props?.title : 'Download'}</Button>
        </p>
      </div>
    );
  }
}

export default Report;