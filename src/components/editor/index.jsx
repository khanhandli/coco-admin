import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { notification } from 'antd';
import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/help';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/image';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/spellchecker';
import 'tinymce/plugins/table';
import 'tinymce/plugins/template';
import 'tinymce/plugins/wordcount';
import 'tinymce/skins/content/default/content.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/themes/silver';
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
                        'advlist autolink link image lists charmap print preview anchor pagebreak',
                        'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                        'save table contextmenu directionality emoticons template codesample fullscreen',
                    ],
                    toolbar:
                        'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons | codesample fullscreen',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    paste_data_images: true,
                    codesample_languages: [
                        { text: 'HTML/XML', value: 'markup' },
                        { text: 'JavaScript', value: 'javascript' },
                        { text: 'ReactJS', value: 'jsx' },
                        { text: 'Typescript', value: 'typescript' },
                        { text: 'CSS', value: 'css' },
                        { text: 'Python', value: 'python' },
                        { text: 'Java', value: 'java' },
                        { text: 'C', value: 'c' },
                        { text: 'C#', value: 'csharp' },
                        { text: 'C++', value: 'cpp' },
                    ],
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
