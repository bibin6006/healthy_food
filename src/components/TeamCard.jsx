import React from "react";

const TeamCard = (props) => {
  const member = props.member || props;
  const { name, qualification, role, bio, initials } = member;
  const displayInitials = initials || (name ? name.split(' ').map((n) => n[0]).join('').slice(0, 2) : 'HF');

  return (
    <div className="bg-card rounded-card border border-rule p-6 sm:p-8 text-left transition-transform duration-200 hover:-translate-y-0.5 shadow-card flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-pill bg-paper-2 border border-rule-2 flex items-center justify-center font-display font-semibold text-accent text-base select-none shrink-0" aria-hidden="true">
            {displayInitials}
          </div>
          <div>
            <h3 className="text-lg font-display font-semibold text-ink leading-tight">{name}</h3>
            <p className="text-xs text-muted font-medium mt-0.5">{role}</p>
          </div>
        </div>

        <p className="text-xs text-muted/90 font-medium mb-3 border-b border-rule/60 pb-2.5">
          {qualification}
        </p>

        <p className="text-sm text-ink-2 leading-relaxed">
          {bio}
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-rule/40 flex items-center gap-2">
        <span className="w-2 h-2 rounded-pill bg-accent" aria-hidden="true" />
        <span className="text-xs text-muted">Kottayam Clinical Team</span>
      </div>
    </div>
  );
};

export default TeamCard;
