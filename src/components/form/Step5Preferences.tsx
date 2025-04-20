import { useFormContext } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

const hobbiesOptions = ['Sports', 'Music', 'Reading', 'Traveling', 'Gaming'];

export default function Step5Preferences() {
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="preferences.contactMode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Mode of Contact</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex space-x-4"
              >
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <RadioGroupItem value="Email" />
                  </FormControl>
                  <FormLabel className="font-normal">Email</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <RadioGroupItem value="Phone" />
                  </FormControl>
                  <FormLabel className="font-normal">Phone</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <RadioGroupItem value="SMS" />
                  </FormControl>
                  <FormLabel className="font-normal">SMS</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="preferences.hobbies"
        render={() => (
          <FormItem>
            <FormLabel>Hobbies and Interests</FormLabel>
            <div className="space-y-2">
              {hobbiesOptions.map((hobby) => (
                <FormField
                  key={hobby}
                  control={control}
                  name="preferences.hobbies"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(hobby)}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...(field.value || []), hobby]
                              : field.value?.filter((v: string) => v !== hobby) || [];
                            field.onChange(newValue);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{hobby}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="preferences.newsletter"
        render={({ field }) => (
          <FormItem className="flex items-center space-x-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>Subscribe to Newsletter</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}