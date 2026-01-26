"use client";

import React, { Fragment, type ElementType } from "react";

interface SafeTextProps {
    text: string;
    className?: string;
    as?: ElementType;
}

/**
 * dangerouslySetInnerHTML을 대체하여 줄바꿈(<br/> 또는 \n)을 안전하게 처리하는 컴포넌트
 * 
 * 주의: <span>, <strong> 등의 인라인 HTML 태그는 지원하지 않습니다.
 * 해당 태그가 포함된 텍스트는 기존 dangerouslySetInnerHTML을 사용해야 합니다.
 */
export function SafeText({ text, className, as: Tag = "span" }: SafeTextProps) {
    // <br>, <br/>, <br /> 또는 \n을 기준으로 분리
    const lines = text.split(/\n|<br\s*\/?>/gi);

    return (
        <Tag className={className}>
            {lines.map((line, i) => (
                <Fragment key={i}>
                    {i > 0 && <br />}
                    {line}
                </Fragment>
            ))}
        </Tag>
    );
}

export default SafeText;
