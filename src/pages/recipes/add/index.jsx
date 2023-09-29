import RecipeForm from '@/components/RecipeForm';


export default function AddRecipePage({children}) {
    return (
        <div>
        {children}
        <RecipeForm />
        </div>
    );
    }