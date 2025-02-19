import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Box,
  Button,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
} from 'lucide-react';

const RichTextEditor = ({ content, onChange }: { content: string; onChange: (html: string) => void }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({ onClick, isActive, icon }: any) => (
    <Button
      size="sm"
      variant="ghost"
      colorScheme={isActive ? 'blue' : 'gray'}
      onClick={onClick}
    >
      {icon}
    </Button>
  );

  return (
    <Box
      border="1px"
      borderColor={useColorModeValue('gray.200', 'gray.600')}
      borderRadius="md"
      overflow="hidden"
    >
      <HStack p={2} borderBottom="1px" borderColor={useColorModeValue('gray.200', 'gray.600')}>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          icon={<Bold size={18} />}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          icon={<Italic size={18} />}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          icon={<Underline size={18} />}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          icon={<List size={18} />}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          icon={<ListOrdered size={18} />}
        />
      </HStack>
      
      <Box p={4}>
        <EditorContent editor={editor} />
      </Box>
    </Box>
  );
};

export default RichTextEditor;