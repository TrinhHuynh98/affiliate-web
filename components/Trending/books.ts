import AtomicHabit from '../assets/atomic_habit.jpg'
import Haemin1 from "../assets/haemin-1.jpg"
import Haemin2 from '../assets/haemin-2.jpg'
import Seneca from '../assets/seneca-1-2.jpg'
import hanhtrinhvephuongdong from '../assets/hanh-trinh-ve-phuong-dong.jpg'
import { StaticImageData } from 'next/image'

export interface Book {
    src: string | StaticImageData;
    title: string;
    main: string;
    rate: string
}

export const bookData: Book[] = [
    {
        src: AtomicHabit, title: "Atomic Habit", main: 'James Clear', rate: 'good'
    },
    {
        src: Haemin1, title: "Bước Chậm lại thế gian vội vã", main: 'Haemin', rate: 'good'
    },
    {
        src: Haemin2, title: "Quẳng gắng lo đi mà sống", main: 'Haemin', rate: 'good'
    },
    {
        src: hanhtrinhvephuongdong, title: "Hành trình về phưong Đông", main: 'Bảid T. Spalding', rate: 'good'
    },
    {
        src: hanhtrinhvephuongdong, title: "Hành trình về phưong Đông", main: 'Bảid T. Spalding', rate: 'good'
    },
    {
        src: hanhtrinhvephuongdong, title: "Hành trình về phưong Đông", main: 'Bảid T. Spalding', rate: 'good'
    }
]