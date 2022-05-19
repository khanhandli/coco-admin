import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { notification } from 'antd';

import { checkImage, imageUpload } from '../../utils/common';

const RichEditor = ({ body, setBody }) => {
    const handleEditorChange = (content, editor) => {
        setBody(content);
    };

    return (
        <>
            <input id="my-file-upload" accept="image/*" type="file" name="my-file-upload" style={{ display: 'none' }} />
            <Editor
                init={{
                    default_link_target: '_blank',
                    height: 500,
                    menubar: true,
                    statubar: true,
                    plugins: [
                        'advlist autolink link image lists charmap print preview anchor',
                        'searchreplace wordcount code fullscreen insertdatetime media nonbreaking',
                        'save table template fullscreen',
                    ],
                    toolbar:
                        'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons | codesample fullscreen',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    paste_data_images: true,
                    file_browser_callback_types: 'image',
                    file_picker_callback: async function (callback, value, meta) {
                        if (meta?.filetype === 'image') {
                            let input = document.getElementById('my-file-upload');
                            input.click();
                            input.onchange = async () => {
                                var file = input.files[0];
                                const check = await checkImage(file);
                                if (check !== '' && check) {
                                    notification['error']({
                                        message: 'Blog Nguyễn Như Ý',
                                        description: check,
                                    });
                                    return;
                                }
                                const photo = await imageUpload(file);
                                if (photo.url) {
                                    callback(photo.url, {
                                        alt: file.name,
                                    });
                                }
                            };
                        }
                    },
                }}
                value={body}
                onEditorChange={handleEditorChange}
                apiKey="hjuz02bsvcykwi6ruki9xpuarsd6l8txzaouzknog6xef2w5"
                scriptLoading={{ async: true }}
            />
        </>
    );
};

export default RichEditor;
