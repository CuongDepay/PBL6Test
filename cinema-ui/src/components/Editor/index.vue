<template>
  <div>
    <el-upload
      :action="upload.url"
      :before-upload="handleBeforeUpload"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadError"
      class="editor-img-uploader"
      name="file"
      :show-file-list="false"
      :headers="upload.headers"
      style="display: none"
      v-if="type === 'url'"
    >
    </el-upload>
    <div class="editor">
      <quill-editor
        ref="myQuillEditor"
        v-model:content="content"
        contentType="html"
        @textChange="(e: any) => $emit('update:modelValue', content)"
        :options="options"
        :style="styles"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { QuillEditor, Quill } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { getToken } from "@/utils/auth";
import { getUploadUrl } from '@/utils/request';
import { ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const props = defineProps({
    /* editor content */
    modelValue: {
        type: String,
    },
    /* high */
    height: {
        type: Number,
        default: null,
    },
    /* minimum height */
    minHeight: {
        type: Number,
        default: null,
    },
    /* read only */
    readOnly: {
        type: Boolean,
        default: false,
    },
    /* Upload file size limit (MB) */
    fileSize: {
        type: Number,
        default: 5,
    },
    /* Type (base64 format, url format) */
    type: {
        type: String,
        default: "url",
    }
});

// eslint-disable-next-line no-undef
const upload = reactive<UploadOption>({
    headers: { Authorization: import.meta.env.VITE_BEARER_KEY + getToken() },
    url: getUploadUrl()
})
const myQuillEditor = ref();

const options = ref({
    theme: "snow",
    bounds: document.body,
    debug: "warn",
    modules: {
        // Toolbar configuration
        toolbar: {
            container: [
                ["bold", "italic", "underline", "strike"],       // Bold Italic Underline Strikethrough
                ["blockquote", "code-block"],                    // quote code block
                [{ list: "ordered" }, { list: "bullet"} ],       // ordered and unordered lists
                [{ indent: "-1" }, { indent: "+1" }],            // indentation
                [{ size: ["small", false, "large", "huge"] }],   // font size
                [{ header: [1, 2, 3, 4, 5, 6, false] }],         // title
                [{ color: [] }, { background: [] }],             // font color, font background color
                [{ align: [] }],                                 // alignment
                ["clean"],                                       // clear text formatting
                ["link", "image", "video"]                       // Links, Images, Videos
            ],
            handlers: {
                image: function (value: any) {
                    if (value) {
                        // Call element image upload
                        (document.querySelector(".editor-img-uploader>.el-upload") as HTMLDivElement)?.click();
                    } else {
                        Quill.format("image", true);
                    }
                },
            },
        }
    },
    placeholder: 'Please enter content',
    readOnly: props.readOnly,
});

const styles = computed(() => {
    let style: any = {};
    if (props.minHeight) {
        style.minHeight = `${props.minHeight}px`;
    }
    if (props.height) {
        style.height = `${props.height}px`;
    }
    return style;
})

const content = ref("");
watch(() => props.modelValue, (v) => {
    if (v !== content.value) {
        content.value = v === undefined ? "<p></p>" : v;
    }
}, { immediate: true });

// The picture is uploaded successfully and the picture address is returned
const handleUploadSuccess = (res: any) => {
    // Get rich text instance
    let quill = toRaw(myQuillEditor.value).getQuill();
    // If the upload is successful
    if (res.code === 200) {
        // get cursor position
        let length = quill.selection.savedRange.index;
        // Insert a picture, res is the link address of the picture returned by the server
        quill.insertEmbed(length, "image", res.data.url);
        // Adjust the cursor to the end
        quill.setSelection(length + 1);
        proxy?.$modal.closeLoading();
    } else {
        proxy?.$modal.loading(res.msg);
        proxy?.$modal.closeLoading();
    }
}

// Block images before uploading
const handleBeforeUpload = (file: any) => {
    // Check file size
    if (props.fileSize) {
        const isLt = file.size / 1024 / 1024 < props.fileSize;
        if (!isLt) {
            proxy?.$modal.msgError(`Upload file size cannot exceed ${props.fileSize} MB!`);
            return false;
        }
    }
    proxy?.$modal.loading('Please wait while the file is being uploaded...');
    return true;
}

// Image failed to block
const handleUploadError = (err: any) => {
    console.error(err);
    proxy?.$modal.msgError('Failed to upload file');
}
</script>

<style lang="scss">
@import "@/assets/styles/variables.module.scss";

.editor, .ql-toolbar {
  white-space: pre-wrap !important;
  line-height: normal !important;
}
.quill-img {
  display: none;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "Please enter the link address: ";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0;
  content: "Save";
  padding-right: 0;
  color: $blue-500;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "Please enter the video address: ";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: 'Dashboard';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "Title 1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "Title 2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "Title 3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "Title 4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "Title 5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "Title 6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "Standard font";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "Serif font";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "Monospace font";
}
</style>
