import { h, Ref, ref, VNodeChild, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { NRadio, useDialog } from 'naive-ui';
import { UserCertificateCreationVariant } from './user-certificate-creation-variant.types';

export default function useUserCertificateCreationVariantDialog(
  businessCode: Ref<string>,
  prependVNode?: () => VNodeChild
) {
  const dialogIsActive = ref(false);
  const dialog = useDialog();
  const { t } = useI18n();
  const router = useRouter();
  const route = useRoute();
  const userId = route.params.userId as string;

  const selectedVariant = ref<UserCertificateCreationVariant>(
    UserCertificateCreationVariant.NEW
  );

  const nextRouteNameBySelectedVariant = {
    [UserCertificateCreationVariant.ADD_AN_EXISTING]:
      'client-user-certificate-attach',
    [UserCertificateCreationVariant.NEW]: 'client-user-certificate-creation'
  };

  watch([ dialogIsActive ], () => {
    dialogIsActive.value &&
      dialog.info({
        title: t('Adding-certificate'),
        positiveText: t('Next'),
        negativeText: t('Cancel'),
        maskClosable: false,
        closeOnEsc: false,
        closable: false,
        positiveButtonProps: {
          type: 'default',
          ghost: true,
          get disabled() {
            return !businessCode.value;
          }
        },
        style: {
          width: '600px'
        },
        onPositiveClick: async () => {
          dialogIsActive.value = false;

          router.push({
            name: nextRouteNameBySelectedVariant[selectedVariant.value],
            params: {
              businessCode: businessCode.value,
              userId
            }
          });
        },
        onNegativeClick: () => {
          dialogIsActive.value = false;
        },
        content: () => [
          prependVNode && prependVNode(),
          h(
            'div',
            { class: 'mt-3' },
            h(NRadio, {
              checked:
                selectedVariant.value === UserCertificateCreationVariant.NEW,
              label: t('Adding-new-certificate'),
              onUpdateChecked: () =>
                (selectedVariant.value = UserCertificateCreationVariant.NEW)
            })
          ),
          h(
            'div',
            { class: 'pb-2' },
            h(NRadio, {
              checked:
                selectedVariant.value ===
                UserCertificateCreationVariant.ADD_AN_EXISTING,
              label: t('Add-an-existing-certificate'),
              class: 'mt-1',
              onUpdateChecked: () =>
                (selectedVariant.value =
                  UserCertificateCreationVariant.ADD_AN_EXISTING)
            })
          )
        ]
      });
  });

  return {
    dialogIsActive
  };
}
