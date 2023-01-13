
import { IItem } from './../utils/interface'
 
interface IListItems { 
    is_required: boolean;
    label: string;
    placeHolder: string;
    items: Array<IItem>;
}

export default function TDCombobox( { is_required, label, placeHolder, items } : IListItems ) {
     
    let required_attribute
    let required_label

    if (is_required === true) {
        required_attribute = "required"
        required_label =   `<span class="required-star"> * </span> ` + label 
    } else {
        required_attribute = ''  
        required_label = label
    }

    return (
        <>
            <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                dangerouslySetInnerHTML={{__html: required_label}}
            > 
            </label>
            <select required_attribute id={ label } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected> { placeHolder }  </option>
                {
                    items.length > 0 && 
                    items.map( (item, index) => {
                        return ( 
                            <option key={ index } value={ item.value }> { item.name } </option>  
                        ) 
                    })
                }
            </select>
        </>
    )
}

