import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface GrammarCourse {
  title: string;
  description: string;
  image: string;
  status: 'Mới' | 'Đang học' | 'Sắp ra mắt';
  buttonText: string;
  buttonDisabled?: boolean;
}

@Component({
  selector: 'app-grammar-list',
  imports: [CommonModule],
  templateUrl: './grammar-list.html',
  styleUrl: './grammar-list.css',
})
export class GrammarList {
  courses: GrammarCourse[] = [
    {
      title: 'Các thì trong Tiếng Anh',
      description: 'Nắm vững 12 thì cơ bản và nâng cao, cách sử dụng và các dấu hiệu nhận biết.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIFxv7YVzfltVIlvM5wBRQz8Osz5vm8RMU1qEdKRNAh7u53DKFKmDpCgmq9MR544Rcbojxc5wiCem0-q2KJGWpRR_mJPzFD_WvXCZ5oTTYKCy56IMV6JDDHGxAIm0924Y9wkhu5C7ljYSpDwWTEBEJm8zwmgGVxuLObf2oFXe_h444DAg1EPFukdlDk_hMFe_-y_qy916U8Ja4gYs_pnqC5NJvBKYafvf8HkuVTdazFf6VWIaNXQPNynR0ClYxXZYMVNA4QAra0Te2',
      status: 'Mới',
      buttonText: 'Xem chi tiết'
    },
    {
      title: 'Câu điều kiện & Câu bị động',
      description: 'Thành thạo các loại câu điều kiện và cách chuyển đổi sang câu bị động một cách chính xác.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQWfdlB4ytdMZbRHUqloS412lCyh-NV7LHjAYeV5JqSNXtcBXsGz_fnnoxcjaQlTxNU2jL9KLJ3OMRo4rtu4rI1q6q6ReLIpaJR-QW58aqgVk2hOQpSyzP94zry2Ep_nRjLHQf-SlJ9vlSlgplXN1yP91c1gtUb2opRbN-Yhvy5s6L63VXpXoxVcglvFrbcCyXqew9x-1In-8Dk1OoLGNG7-LW9oOLecKtlim4Zco7Gy-qzf7ZuBXuTkmc_b-q4Gw5d23DwR35WqdL',
      status: 'Đang học',
      buttonText: 'Tiếp tục học'
    },
    {
      title: 'Mệnh đề quan hệ nâng cao',
      description: 'Khám phá cách sử dụng mệnh đề quan hệ xác định, không xác định và rút gọn mệnh đề.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwrANIBSPZ5KtSlLrGDi06J1SrTtiTif415AgI92iKSLy25PhL7s8u4BxtZcYZARFXe4PUleqS6R6q4bNTv3LZWh-VLVdXSQXj49cFsxoSDj1o_mysicFl9npBPezFH3Lht81ZanWMhfa-BX5vLDyN60PpN1FhvHJWmNYXlMIdtSgP7EfswnzKJMz7u3Rk_Y3SFmzIRzlMr_aJJGSFpcWsRQHIpI5DzIfF2yDLCxqAOekPkQ4kkYN0p_vlX2eBjirK6KKJgmdBcAWk',
      status: 'Sắp ra mắt',
      buttonText: 'Đăng ký trước',
      buttonDisabled: true
    },
    {
      title: 'Sử dụng Mạo từ a/an/the',
      description: 'Hiểu rõ các quy tắc và trường hợp đặc biệt khi sử dụng mạo từ trong tiếng Anh.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCI_Ww1N50SCBARa8pXdLPct11kD9sJPsFzhK1KaAUfi4kMBL6CpZU74Qw2W7qzFJFd_N9TJSfCYkD6_JWFPnZDgzWVZgFm-JATtf6j-zx9bBcejANNMdkenLRBfLMxZWEhOwKxz7QKaymmtZ7Xcvrwa2GIbnNNEJCceY_4GzPEgArGPI6D24ftWQKONZMVtxUQbD_pqlCIXNP96vtk7Y0Nwdwi5cdpSjPBmW3aowmT_j9oNgu9vnCwzg06LX4ttS2l0x8gMA1yiAog',
      status: 'Mới',
      buttonText: 'Xem chi tiết'
    },
    {
      title: 'Giới từ: In, On, At',
      description: 'Phân biệt và áp dụng chính xác các giới từ chỉ thời gian và nơi chốn phổ biến nhất.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdJH5AUS82nha9MDQFG7dgWWhFHWHi-S9l-wZ8DsKQsRy4m3B7PtwE-u-uJCS5FVaWOMJi0k3Y6qoir8Z12lyw1gnDpkVBbUIxOpCIICiGQT6v00vFuPiNK82GCFXZkL8htT0ucVD9qTq8zrPTJU9jA_4aYf2kW6qGTItj1V_Ted3wOvM6D0Yfe4mxBjrzqSt7F0x4Qzk7AUGbbjTWA1ICTCOif_D2-loOC1XfrJDFSuIUfgX5AG36kP0YwfD6_hKABirZpqf5hVIj',
      status: 'Mới',
      buttonText: 'Xem chi tiết'
    },
    {
      title: 'So sánh hơn và so sánh nhất',
      description: 'Học cách hình thành và sử dụng các dạng so sánh của tính từ và trạng từ.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgu0JDR8AngNLWAqGERG15c8n8bzMfEup2-aBcYoaiVjWdLbQnrtCcPAfdHq8yLR7L7jCgQ64WcSVrWRC5X96Gn8rtNCmy1L4Pg85ri0pCadxvQemWMsFkSqMajWuJiSbucvQ-T8aJus3g3nRx4VD5RVmBl0NwWtNTgc-2psD2oMm9UnjY5STNBp4TcTmidVjtMABaB8buvGBybR3qmq7EsEN0PXZicqER9zfyUWr5odmU6oP1Ge3IZK7sdVu8bCGT5G7cQ19eOmpr',
      status: 'Sắp ra mắt',
      buttonText: 'Đăng ký trước',
      buttonDisabled: true
    }
  ];

  getStatusClass(status: string): string {
    switch (status) {
      case 'Mới':
        return 'bg-green-500/10 text-green-400 ring-green-500/20';
      case 'Đang học':
        return 'bg-blue-500/10 text-blue-400 ring-blue-500/20';
      case 'Sắp ra mắt':
        return 'bg-yellow-500/10 text-yellow-400 ring-yellow-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 ring-gray-500/20';
    }
  }
}
