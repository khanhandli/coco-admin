import { notification } from 'antd';

export const getNotifications = (desc, status) => {
    notification[status]({
        message: desc,
        placement: 'topRight',
    });
};

export const imageUpload = async (file) => {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'breqd0hm');
    formData.append('cloud_name', 'hunre');

    const res = await fetch('https://api.cloudinary.com/v1_1/hunre/image/upload', {
        method: 'POST',
        body: formData,
    });

    const data = await res.json();
    return { public_id: data.public_id, url: data.secure_url };
};

export const formatNumber = (number) => {
    return number?.toString()?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

export const checkImage = (file) => {
    const types = ['image/png', 'image/jpeg'];
    let err = '';
    if (!file) return (err = 'Tập tin không tồn tại.');

    if (file.size > 1024 * 1024) err = 'Kích cỡ vượt quá 1mb.';

    if (!types.includes(file.type)) err = 'Ảnh không đúng định dạnh png / jpg.';

    return err;
};

export const TimeDay = () => {
    const today = new Date();
    const curHr = today.getHours();

    if (curHr < 12) {
        return 'Chào buổi sáng!';
    } else if (curHr < 18) {
        return 'Chào buổi chiều!';
    } else {
        return 'Chào buổi tối';
    }
};
