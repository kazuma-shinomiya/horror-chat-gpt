const POLICIES = [
  {
    title: "収集する個人情報",
    description: "本チャットボットでは、以下のような利用者の個人情報を収集する場合があります。",
    caseItems: [
      "LINEのユーザーID",
      "ニックネーム、アイコン画像",
      "本チャットボットでの発言内容",
      "利用者が任意で入力・送信した情報",
    ],
  },
  {
    title: "個人情報の利用目的",
    description: "本チャットボットで収集した個人情報は、以下の目的で利用されます。",
    caseItems: [
      "本チャットボットのサービス提供のため",
      "利用者への情報提供や通知のため",
      "本チャットボットの品質向上や改善のため",
      "本ポリシーに同意いただいた目的以外の利用は行いません。",
    ],
  },
  {
    title: "個人情報の提供・開示",
    description: "開発者は、以下の場合を除き、第三者に利用者の個人情報を提供・開示しません。",
    caseItems: [
      "利用者の同意がある場合",
      "法令に基づき、提供・開示が必要である場合",
      "人命・財産の保護のために開示が必要な場合で、利用者本人からの同意が得られない場合",
    ],
  },
  {
    title: "個人情報の管理",
    description:
      "開発者は、利用者の個人情報を適切に管理し、不正アクセスや紛失・破壊・改ざん・漏洩等のリスクに対して必要かつ適切な安全対策を講じます。",
  },
  {
    title: "プライバシーポリシーの変更",
    description:
      "開発者は、適用法令・規則を遵守するとともに、本ポリシーの内容を適宜見直し、その改善に努めます。本ポリシーの変更は、本チャットボット上で告知するものとします。変更後の本ポリシーは、本チャットボット上で告知された時点より効力を生じるものとします。",
  },
  {
    title: "免責事項",
    description:
      "本チャットボットからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。また、本チャットボットの利用により、予期せぬトラブルや損害が発生した場合でも、開発者は責任を負いません。",
  },
  {
    title: "お問い合わせ窓口",
    description: "本ポリシーに関するお問い合わせは、こちらのメールまでお願いいたします。",
  },
];

export default function Privacy() {
  return (
    <div className="mx-4">
      <h2 className="py-6 text-xl font-semibold text-center">プライバシーポリシー</h2>
      <p>
        本プライバシーポリシー（以下、「本ポリシー」といいます）は、K.S（以下、「開発者」といいます）が開発・運営するLINEのチャットボット
        コワボット（以下、「本チャットボット」といいます）における、利用者の個人情報の取り扱いについて定めたものです。利用者は、本チャットボットを利用することにより、本ポリシーに同意したものとみなされます。
      </p>
      <ul className="mb-4">
        {POLICIES.map((policy, policyIndex) => {
          const { title, description, caseItems } = policy;
          return (
            <li key={policyIndex} className="mt-2">
              <h3 className="font-semibold text-lg text-left">
                {policyIndex + 1}.{title}
              </h3>
              {title === "お問い合わせ窓口" ? (
                <a href="mailto:chrisbrat0@gmail.com" className="text-sky-400">
                  {description}
                </a>
              ) : (
                <p>{description}</p>
              )}
              {caseItems && (
                <ol>
                  {caseItems.map((caseItem, caseIndex) => (
                    <li key={caseIndex}>
                      ({caseIndex + 1}){caseItem}
                    </li>
                  ))}
                </ol>
              )}
            </li>
          );
        })}
      </ul>
      <p>制定日：2023年5月3日</p>
      <p>最終改訂日：2023年5月3日</p>
      <p>K.S</p>
    </div>
  );
}
