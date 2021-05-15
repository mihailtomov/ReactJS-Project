import './ArticleForm.css';

import { Form } from 'formik';
import { MyTextInput, MyTextareaInput, MySelect } from '../../../reusable-components/reusable-components.js';
import availableOptions from '../../../utils/categoryOptions.js';

const ArticleForm = () => {
    return (
        <Form className="article-form">
            <MyTextInput
                label="Title:"
                name="title"
                type="text"
                placeholder="Title.."
            />

            <MyTextareaInput
                label="Content:"
                name="content"
                placeholder="Description.."
            />

            <MySelect label="Category:" name="category">
                {availableOptions.map(o => {
                    return <option key={o.value} value={o.value}>{o.label}</option>
                })}
            </MySelect>

            <MyTextInput
                label="Image URL (optional):"
                name="imageUrl"
                type="text"
                placeholder="http://"
            />

            <MyTextInput
                label="Youtube URL (optional):"
                name="youtubeUrl"
                type="text"
                placeholder="https://"
            />

            <input type="submit" value="Submit" />
        </Form>
    );
}

export default ArticleForm;