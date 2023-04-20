import * as UiAvatar from '@radix-ui/react-avatar'

export function Avatar() {
  return (
    <UiAvatar.Root 
      className="inline-flex items-center justify-center align-middle overflow-hidden select-none w-11 h-11 rounded-full bg-gray-700"
    >
      <UiAvatar.Image
        className="w-full h-full object-cover rounded-[inherit]"
        src="https://narutoshippudenblog.files.wordpress.com/2010/07/kakuzu-1.jpg"
        alt="Colm Tuite"
      />
      <UiAvatar.Fallback 
        className="w-full h-full flex items-center justify-center bg-white text-orange-500 text-sm font-semibold" 
        delayMs={600}
      >
        CT
      </UiAvatar.Fallback>
    </UiAvatar.Root>
  )
}
