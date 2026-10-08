// Next.js 설정의 형식을 검사하는 타입을 가져온다.
// `import type`은 타입 검사에만 쓰이며 실행 코드에는 포함되지 않는다.
import type { NextConfig } from "next";

// Next.js의 실행·빌드에 적용할 설정을 담는 객체다.
// `: NextConfig`는 설정 이름과 값의 타입을 검사한다.
// 현재는 빈 객체이므로 별도 옵션을 지정하지 않고 기본 설정을 사용한다.
const nextConfig: NextConfig = {};

// Next.js가 이 파일에서 설정 객체를 읽을 수 있도록 기본 내보내기로 제공한다.
export default nextConfig;
