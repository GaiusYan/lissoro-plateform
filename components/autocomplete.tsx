import { useState } from "react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";


import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { Button } from "./ui/button";
import { ChevronsUpDown } from "lucide-react";
import { CommandEmpty } from "cmdk";

interface AutocompleteProps {
    options: string[],
    value?: string, 
    onChange?: (value: string) => void,
    placeholder: string,
}

export const Autocomplete = ({
    options,
    value,
    onChange,
    placeholder,
}: AutocompleteProps) => {

    const [open,setOpen] = useState<boolean>(false);
    const selected : any = options.find((opt: any) => opt.value === value);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
                <Button
                    variant={"outline"}
                    role={"combobox"}
                    aria-expanded={open}
                    className={'w-full justify-between'}
                >
                    {selected ? selected.label : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50"/>
                </Button>
            </PopoverTrigger>


            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder={placeholder}/>
                    <CommandEmpty>
                        Aucun résultat trouvé
                    </CommandEmpty>
                   {/*  <CommandGroup>
                        {options.map((option: any) => (
                            <CommandItem
                                key={option?.value
                                value={option.value}
                                onSelect={ () => {
                                    
                                }
                                    onChange?.(option.value)
                                    setOpen(false)
                                }
                                }>

                            </CommandItem>
                        ))}
                    </CommandGroup> */}
                </Command>
            </PopoverContent>
        </Popover>
    );
};