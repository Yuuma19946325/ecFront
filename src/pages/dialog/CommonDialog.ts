import { ref, watch, type SetupContext } from 'vue'

interface Props {
  dialogOpen: boolean
}

export function commonDialog(props: Props, context: SetupContext) {
  const localDialogOpen = ref(props.dialogOpen)

  watch(
    () => props.dialogOpen,
    (newVal) => {
      localDialogOpen.value = newVal
    }
  )

  const closeDialog = () => {
    localDialogOpen.value = false
    context.emit('update:dialogOpen', false)
  }

  return {
    localDialogOpen,
    closeDialog
  }
}
