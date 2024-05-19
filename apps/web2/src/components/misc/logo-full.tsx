export function LogoFull(props: React.ComponentProps<'svg'>): React.ReactElement | null {
  return (
    <svg
      className="stroke-[rgb(var(--foreground-rgb))] fill-[rgb(var(--foreground-rgb))]"
      width={200}
      height={26}
      viewBox="0 0 200 26"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line x1="9.19527" y1="2.28171" x2="1.28172" y2="24.024" strokeWidth="2" strokeLinecap="round" />
      <line
        x1="1"
        y1="-1"
        x2="24.1377"
        y2="-1"
        transform="matrix(0.34202 0.939693 0.939693 -0.34202 10 1)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="1"
        y1="-1"
        x2="24.1377"
        y2="-1"
        transform="matrix(-0.34202 -0.939693 -0.939693 0.34202 36.6715 25)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line x1="37.4023" y1="23.7183" x2="45.3159" y2="1.97601" strokeWidth="2" strokeLinecap="round" />
      <line
        x1="1"
        y1="-1"
        x2="24.1377"
        y2="-1"
        transform="matrix(0.34202 0.939693 0.939693 -0.34202 20.1827 1)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M67.3105 9.14551L63.6631 20H61.1055L65.8867 7.20312H67.5215L67.3105 9.14551ZM70.3604 20L66.6953 9.14551L66.4756 7.20312H68.1191L72.9268 20H70.3604ZM70.1934 15.2451V17.1523H63.3291V15.2451H70.1934ZM78.9684 20H76.2086L76.2262 18.1016H78.9684C79.7125 18.1016 80.3365 17.9375 80.8404 17.6094C81.3443 17.2754 81.7252 16.7979 81.983 16.1768C82.2408 15.5498 82.3697 14.7998 82.3697 13.9268V13.2676C82.3697 12.5938 82.2965 11.999 82.15 11.4834C82.0035 10.9678 81.7867 10.5342 81.4996 10.1826C81.2184 9.83105 80.8697 9.56445 80.4537 9.38281C80.0377 9.20117 79.5602 9.11035 79.0211 9.11035H76.1559V7.20312H79.0211C79.8766 7.20312 80.6559 7.34668 81.359 7.63379C82.068 7.9209 82.6803 8.33398 83.1959 8.87305C83.7174 9.40625 84.1158 10.0449 84.3912 10.7891C84.6725 11.5332 84.8131 12.3652 84.8131 13.2852V13.9268C84.8131 14.8408 84.6725 15.6729 84.3912 16.4229C84.1158 17.167 83.7174 17.8057 83.1959 18.3389C82.6803 18.8721 82.065 19.2822 81.3502 19.5693C80.6354 19.8564 79.8414 20 78.9684 20ZM77.5621 7.20312V20H75.1451V7.20312H77.5621ZM94.467 16.6777C94.467 16.4316 94.4289 16.2119 94.3527 16.0186C94.2824 15.8193 94.1506 15.6406 93.9572 15.4824C93.7697 15.3184 93.5031 15.1602 93.1574 15.0078C92.8176 14.8496 92.3781 14.6855 91.8391 14.5156C91.2414 14.3281 90.6848 14.1172 90.1691 13.8828C89.6535 13.6484 89.1994 13.376 88.8068 13.0654C88.4201 12.7549 88.1184 12.3975 87.9016 11.9932C87.6848 11.583 87.5764 11.1084 87.5764 10.5693C87.5764 10.042 87.6877 9.56152 87.9104 9.12793C88.1389 8.69434 88.4611 8.32227 88.8771 8.01172C89.2932 7.69531 89.7824 7.45215 90.3449 7.28223C90.9133 7.1123 91.5402 7.02734 92.2258 7.02734C93.175 7.02734 93.9953 7.2002 94.6867 7.5459C95.384 7.8916 95.923 8.36035 96.3039 8.95215C96.6848 9.54395 96.8752 10.209 96.8752 10.9473H94.467C94.467 10.5488 94.382 10.1973 94.2121 9.89258C94.048 9.58789 93.7961 9.34766 93.4562 9.17188C93.1223 8.99609 92.7004 8.9082 92.1906 8.9082C91.6984 8.9082 91.2883 8.98145 90.9602 9.12793C90.6379 9.27441 90.3947 9.47363 90.2307 9.72559C90.0725 9.97754 89.9934 10.2588 89.9934 10.5693C89.9934 10.8037 90.049 11.0146 90.1604 11.2021C90.2717 11.3838 90.4387 11.5566 90.6613 11.7207C90.884 11.8789 91.1594 12.0283 91.4875 12.1689C91.8215 12.3037 92.2082 12.4385 92.6477 12.5732C93.3508 12.7842 93.966 13.0186 94.4934 13.2764C95.0266 13.5342 95.4689 13.8271 95.8205 14.1553C96.1779 14.4834 96.4445 14.8525 96.6203 15.2627C96.802 15.6729 96.8928 16.1387 96.8928 16.6602C96.8928 17.2109 96.7844 17.7031 96.5676 18.1367C96.3508 18.5703 96.0402 18.9395 95.6359 19.2441C95.2316 19.5488 94.7453 19.7803 94.177 19.9385C93.6145 20.0967 92.9846 20.1758 92.2873 20.1758C91.6662 20.1758 91.051 20.0938 90.4416 19.9297C89.8381 19.7598 89.2902 19.5078 88.798 19.1738C88.3059 18.834 87.9133 18.4062 87.6203 17.8906C87.3273 17.3691 87.1809 16.7598 87.1809 16.0625H89.6066C89.6066 16.4668 89.6711 16.8125 89.8 17.0996C89.9348 17.3809 90.1223 17.6123 90.3625 17.7939C90.6086 17.9697 90.8957 18.0986 91.2238 18.1807C91.552 18.2627 91.9064 18.3037 92.2873 18.3037C92.7795 18.3037 93.1838 18.2363 93.5002 18.1016C93.8225 17.9609 94.0627 17.7676 94.2209 17.5215C94.385 17.2754 94.467 16.9941 94.467 16.6777ZM104.156 17.4951L107.346 7.20312H110.027L105.51 20H103.725L104.156 17.4951ZM101.212 7.20312L104.385 17.4951L104.842 20H103.04L98.5398 7.20312H101.212ZM114.821 7.20312V20H112.404V7.20312H114.821ZM126.812 18.1016V20H120.01V18.1016H126.812ZM120.748 7.20312V20H118.331V7.20312H120.748ZM125.925 12.4854V14.3398H120.01V12.4854H125.925ZM126.786 7.20312V9.11035H120.01V7.20312H126.786ZM132.538 17.5479L135.087 7.20312H136.466L136.554 9.38281L133.83 20H132.371L132.538 17.5479ZM130.929 7.20312L133.021 17.5127V20H131.43L128.53 7.20312H130.929ZM139.2 17.4688L141.256 7.20312H143.665L140.764 20H139.173L139.2 17.4688ZM137.126 7.20312L139.674 17.583L139.824 20H138.365L135.649 9.37402L135.754 7.20312H137.126ZM154.575 18.1016V20H147.773V18.1016H154.575ZM148.511 7.20312V20H146.094V7.20312H148.511ZM153.688 12.4854V14.3398H147.773V12.4854H153.688ZM154.549 7.20312V9.11035H147.773V7.20312H154.549ZM157.154 7.20312H161.804C162.776 7.20312 163.611 7.34961 164.308 7.64258C165.006 7.93555 165.542 8.36914 165.917 8.94336C166.292 9.51758 166.479 10.2236 166.479 11.0615C166.479 11.7236 166.362 12.2979 166.128 12.7842C165.893 13.2705 165.562 13.6777 165.135 14.0059C164.713 14.334 164.215 14.5918 163.64 14.7793L162.885 15.166H158.78L158.762 13.2588H161.83C162.328 13.2588 162.741 13.1709 163.069 12.9951C163.397 12.8193 163.643 12.5762 163.807 12.2656C163.977 11.9551 164.062 11.6006 164.062 11.2021C164.062 10.7744 163.98 10.4053 163.816 10.0947C163.652 9.77832 163.403 9.53516 163.069 9.36523C162.735 9.19531 162.313 9.11035 161.804 9.11035H159.571V20H157.154V7.20312ZM164.379 20L161.417 14.2695L163.974 14.2607L166.971 19.877V20H164.379ZM169.418 18.8662C169.418 18.5146 169.538 18.2188 169.779 17.9785C170.019 17.7383 170.344 17.6182 170.754 17.6182C171.164 17.6182 171.49 17.7383 171.73 17.9785C171.97 18.2188 172.09 18.5146 172.09 18.8662C172.09 19.2119 171.97 19.5049 171.73 19.7451C171.49 19.9795 171.164 20.0967 170.754 20.0967C170.344 20.0967 170.019 19.9795 169.779 19.7451C169.538 19.5049 169.418 19.2119 169.418 18.8662ZM178.088 7.20312V20H175.671V7.20312H178.088ZM191.961 13.2764V13.9355C191.961 14.9023 191.832 15.7725 191.574 16.5459C191.316 17.3135 190.95 17.9668 190.475 18.5059C190.001 19.0449 189.435 19.458 188.779 19.7451C188.123 20.0322 187.393 20.1758 186.59 20.1758C185.799 20.1758 185.073 20.0322 184.411 19.7451C183.754 19.458 183.186 19.0449 182.706 18.5059C182.225 17.9668 181.853 17.3135 181.589 16.5459C181.326 15.7725 181.194 14.9023 181.194 13.9355V13.2764C181.194 12.3037 181.326 11.4336 181.589 10.666C181.853 9.89844 182.222 9.24512 182.697 8.70605C183.171 8.16113 183.737 7.74512 184.393 7.45801C185.055 7.1709 185.782 7.02734 186.573 7.02734C187.376 7.02734 188.105 7.1709 188.761 7.45801C189.418 7.74512 189.983 8.16113 190.458 8.70605C190.938 9.24512 191.307 9.89844 191.565 10.666C191.829 11.4336 191.961 12.3037 191.961 13.2764ZM189.517 13.9355V13.2588C189.517 12.5615 189.453 11.9492 189.324 11.4219C189.195 10.8887 189.004 10.4404 188.753 10.0771C188.501 9.71387 188.19 9.44141 187.821 9.25977C187.452 9.07227 187.036 8.97852 186.573 8.97852C186.104 8.97852 185.688 9.07227 185.325 9.25977C184.967 9.44141 184.663 9.71387 184.411 10.0771C184.159 10.4404 183.965 10.8887 183.831 11.4219C183.702 11.9492 183.637 12.5615 183.637 13.2588V13.9355C183.637 14.627 183.702 15.2393 183.831 15.7725C183.965 16.3057 184.159 16.7568 184.411 17.126C184.669 17.4893 184.979 17.7646 185.342 17.9521C185.706 18.1396 186.122 18.2334 186.59 18.2334C187.059 18.2334 187.475 18.1396 187.838 17.9521C188.202 17.7646 188.506 17.4893 188.753 17.126C189.004 16.7568 189.195 16.3057 189.324 15.7725C189.453 15.2393 189.517 14.627 189.517 13.9355Z"
        strokeWidth="0"
      />
    </svg>
  );
}
